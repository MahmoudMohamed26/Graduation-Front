import React, { createContext, useContext, useEffect, useRef, useState, useCallback } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

// Create WebSocket Context
const WebSocketContext = createContext();

// WebSocket Provider Component
export const WebSocketProvider = ({ children, wsEndpoint }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('disconnected');
  const stompClientRef = useRef(null);
  const subscriptionsRef = useRef(new Map());
  const reconnectTimeoutRef = useRef(null);
  const reconnectAttempts = useRef(0);
  const maxReconnectAttempts = 5;

  const connect = useCallback(() => {
    if (stompClientRef.current?.connected) {
      return;
    }

    setConnectionStatus('connecting');

    const stompClient = new Client({
      webSocketFactory: () => new SockJS(wsEndpoint),
      connectHeaders: {
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    stompClient.onConnect = (frame) => {
      setIsConnected(true);
      setConnectionStatus('connected');
      reconnectAttempts.current = 0;

      resubscribeAll();
    };

    stompClient.onStompError = (frame) => {
      console.error("❌ STOMP Error:", frame.headers['message']);
      console.error("Additional details:", frame.body);
      setIsConnected(false);
      setConnectionStatus('error');
      handleReconnect();
    };

    stompClient.onDisconnect = () => {
      setIsConnected(false);
      setConnectionStatus('disconnected');
      handleReconnect();
    };

    stompClient.onWebSocketError = (error) => {
      console.error("🌐 WebSocket Error:", error);
      setIsConnected(false);
      setConnectionStatus('error');
      handleReconnect();
    };

    stompClient.onWebSocketClose = (event) => {
      setIsConnected(false);
      setConnectionStatus('disconnected');
      handleReconnect();
    };

    stompClient.activate();
    stompClientRef.current = stompClient;
    // eslint-disable-next-line
  }, [wsEndpoint]);

  const handleReconnect = useCallback(() => {
    if (reconnectAttempts.current >= maxReconnectAttempts) {
      console.error("❌ Max reconnection attempts reached");
      setConnectionStatus('error');
      return;
    }

    reconnectAttempts.current += 1;
    const delay = Math.min(1000 * Math.pow(2, reconnectAttempts.current), 30000);
    
    reconnectTimeoutRef.current = setTimeout(() => {
      connect();
    }, delay);
  }, [connect]);

  const resubscribeAll = useCallback(() => {
    subscriptionsRef.current.forEach((subscriptionData, key) => {
      const { topic, callback } = subscriptionData;
      
      if (stompClientRef.current?.connected) {
        const subscription = stompClientRef.current.subscribe(topic, callback);
        subscriptionsRef.current.set(key, {
          ...subscriptionData,
          subscription
        });
      }
    });
  }, []);

  const subscribe = useCallback((topic, callback, subscriptionKey = null) => {
    const key = subscriptionKey || `${topic}_${Date.now()}`;

    subscriptionsRef.current.set(key, {
      topic,
      callback,
      subscription: null
    });

    if (stompClientRef.current?.connected) {
      try {
        const subscription = stompClientRef.current.subscribe(topic, (message) => {
          try {
            const data = JSON.parse(message.body);
            callback(data, message);
          } catch (error) {
            console.error(`❌ Error parsing message for ${topic}:`, error);
            callback(null, message, error);
          }
        });

        subscriptionsRef.current.set(key, {
          topic,
          callback,
          subscription
        });

        return key;
      } catch (error) {
        console.error(`❌ Error subscribing to ${topic}:`, error);
        subscriptionsRef.current.delete(key);
        return null;
      }
    } else {
      console.log(`⏳ WebSocket not connected. Subscription to ${topic} will be activated on connection.`);
      return key;
    }
  }, []);

  const unsubscribe = useCallback((subscriptionKey) => {
    
    const subscriptionData = subscriptionsRef.current.get(subscriptionKey);
    if (subscriptionData) {
      if (subscriptionData.subscription) {
        try {
          subscriptionData.subscription.unsubscribe();
        } catch (error) {
          console.error(`❌ Error unsubscribing from ${subscriptionData.topic}:`, error);
        }
      }
      subscriptionsRef.current.delete(subscriptionKey);
    }
  }, []);

  // Send message to a destination
  const sendMessage = useCallback((destination, body, headers = {}) => {
    if (stompClientRef.current?.connected) {
      try {
        stompClientRef.current.publish({
          destination,
          body: typeof body === 'string' ? body : JSON.stringify(body),
          headers
        });
        console.log(`📤 Message sent to ${destination}:`, body);
        return true;
      } catch (error) {
        console.error(`❌ Error sending message to ${destination}:`, error);
        return false;
      }
    } else {
      console.warn(`⚠️ Cannot send message to ${destination}: WebSocket not connected`);
      return false;
    }
  }, []);

  // Disconnect WebSocket
  const disconnect = useCallback(() => {
    
    // Clear reconnection timeout
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }

    // Clear all subscriptions
    subscriptionsRef.current.clear();
    
    // Deactivate STOMP client
    if (stompClientRef.current) {
      stompClientRef.current.deactivate();
      stompClientRef.current = null;
    }
    
    setIsConnected(false);
    setConnectionStatus('disconnected');
  }, []);

  // Get connection stats
  const getConnectionStats = useCallback(() => {
    return {
      isConnected,
      connectionStatus,
      reconnectAttempts: reconnectAttempts.current,
      activeSubscriptions: subscriptionsRef.current.size,
      subscriptionKeys: Array.from(subscriptionsRef.current.keys())
    };
  }, [isConnected, connectionStatus]);

  useEffect(() => {
    connect();

    return () => {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      disconnect();
    };
  }, [connect, disconnect]);

  const contextValue = {
    isConnected,
    connectionStatus,
    subscribe,
    unsubscribe,
    sendMessage,
    connect,
    disconnect,
    getConnectionStats
  };

  return (
    <WebSocketContext.Provider value={contextValue}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error('useWebSocket must be used within a WebSocketProvider');
  }
  return context;
};

export const useWebSocketSubscription = (topic, callback, dependencies = [], subscriptionKey = null) => {
  const { subscribe, unsubscribe, isConnected } = useWebSocket();
  const subscriptionKeyRef = useRef(null);

  useEffect(() => {
    if (topic && callback) {
      if (subscriptionKeyRef.current) {
        unsubscribe(subscriptionKeyRef.current);
      }

      const key = subscribe(topic, callback, subscriptionKey);
      subscriptionKeyRef.current = key;

      return () => {
        if (subscriptionKeyRef.current) {
          unsubscribe(subscriptionKeyRef.current);
          subscriptionKeyRef.current = null;
        }
      };
    }
    // eslint-disable-next-line
  }, [topic, callback, subscribe, unsubscribe, subscriptionKey, ...dependencies]);

  return { isConnected, subscriptionKey: subscriptionKeyRef.current };
};