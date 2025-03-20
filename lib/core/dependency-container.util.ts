/**
 * Dependency container for managing service instances
 * Provides a simple dependency injection mechanism
 */

import { logger } from './logger.util';

// Define the container type to hold service instances
type Container = Record<string, unknown>;

// Singleton container instance
const container: Container = {};

/**
 * Register a service in the container
 */
export function register<T>(key: string, instance: T): void {
  if (container[key]) {
    logger.warn(`Service '${key}' is already registered and will be overwritten.`);
  }

  container[key] = instance;
  logger.debug(`Service '${key}' has been registered.`);
}

/**
 * Get a service from the container
 */
export function resolve<T>(key: string): T {
  const instance = container[key] as T | undefined;

  if (!instance) {
    logger.error(`Service '${key}' is not registered in the container.`);
    throw new Error(`Service '${key}' is not registered in the container.`);
  }

  return instance;
}

/**
 * Check if a service is registered
 */
export function has(key: string): boolean {
  return !!container[key];
}

/**
 * Remove a service from the container
 */
export function remove(key: string): void {
  if (container[key]) {
    delete container[key];
    logger.debug(`Service '${key}' has been removed.`);
  }
}

/**
 * Clear all services from the container
 */
export function clear(): void {
  Object.keys(container).forEach(key => {
    delete container[key];
  });

  logger.debug('All services have been cleared from the container.');
}

// Register core services
register('logger', logger);

// Export the container API
export const DependencyContainer = {
  register,
  resolve,
  has,
  remove,
  clear,
};
