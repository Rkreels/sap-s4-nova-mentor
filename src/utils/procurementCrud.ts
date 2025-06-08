
import { useToast } from '../hooks/use-toast';

export interface CrudOperations<T> {
  items: T[];
  loading: boolean;
  error: string | null;
  create: (item: Omit<T, 'id'>) => Promise<T>;
  read: (id: string) => T | undefined;
  update: (id: string, updates: Partial<T>) => Promise<T>;
  delete: (id: string) => Promise<boolean>;
  search: (query: string, fields: (keyof T)[]) => T[];
  filter: (predicate: (item: T) => boolean) => T[];
  sort: (field: keyof T, direction: 'asc' | 'desc') => T[];
  bulkCreate: (items: Omit<T, 'id'>[]) => Promise<T[]>;
  bulkUpdate: (updates: { id: string; data: Partial<T> }[]) => Promise<T[]>;
  bulkDelete: (ids: string[]) => Promise<boolean>;
  export: (format: 'json' | 'csv' | 'excel') => string | Blob;
  import: (data: any[], format: 'json' | 'csv') => Promise<T[]>;
}

export function useProcurementCrud<T extends { id: string }>(
  initialData: T[] = [],
  entityName: string
): CrudOperations<T> {
  const [items, setItems] = React.useState<T[]>(initialData);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const { toast } = useToast();

  const generateId = (): string => {
    return `${entityName.toUpperCase()}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  };

  const create = async (item: Omit<T, 'id'>): Promise<T> => {
    setLoading(true);
    setError(null);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API call
      
      const newItem = {
        ...item,
        id: generateId(),
        created: new Date().toISOString(),
        updated: new Date().toISOString()
      } as T;
      
      setItems(prev => [...prev, newItem]);
      
      toast({
        title: `${entityName} Created`,
        description: `New ${entityName.toLowerCase()} has been successfully created.`,
      });
      
      return newItem;
    } catch (err) {
      const errorMessage = `Failed to create ${entityName.toLowerCase()}`;
      setError(errorMessage);
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const read = (id: string): T | undefined => {
    return items.find(item => item.id === id);
  };

  const update = async (id: string, updates: Partial<T>): Promise<T> => {
    setLoading(true);
    setError(null);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const updatedItem = {
        ...items.find(item => item.id === id),
        ...updates,
        updated: new Date().toISOString()
      } as T;
      
      setItems(prev => prev.map(item => 
        item.id === id ? updatedItem : item
      ));
      
      toast({
        title: `${entityName} Updated`,
        description: `${entityName} has been successfully updated.`,
      });
      
      return updatedItem;
    } catch (err) {
      const errorMessage = `Failed to update ${entityName.toLowerCase()}`;
      setError(errorMessage);
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteItem = async (id: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      
      setItems(prev => prev.filter(item => item.id !== id));
      
      toast({
        title: `${entityName} Deleted`,
        description: `${entityName} has been successfully removed.`,
      });
      
      return true;
    } catch (err) {
      const errorMessage = `Failed to delete ${entityName.toLowerCase()}`;
      setError(errorMessage);
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const search = (query: string, fields: (keyof T)[]): T[] => {
    const lowercaseQuery = query.toLowerCase();
    return items.filter(item =>
      fields.some(field => {
        const value = item[field];
        return value && value.toString().toLowerCase().includes(lowercaseQuery);
      })
    );
  };

  const filter = (predicate: (item: T) => boolean): T[] => {
    return items.filter(predicate);
  };

  const sort = (field: keyof T, direction: 'asc' | 'desc'): T[] => {
    return [...items].sort((a, b) => {
      const aVal = a[field];
      const bVal = b[field];
      
      if (aVal < bVal) return direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return direction === 'asc' ? 1 : -1;
      return 0;
    });
  };

  const bulkCreate = async (newItems: Omit<T, 'id'>[]): Promise<T[]> => {
    setLoading(true);
    setError(null);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const createdItems = newItems.map(item => ({
        ...item,
        id: generateId(),
        created: new Date().toISOString(),
        updated: new Date().toISOString()
      })) as T[];
      
      setItems(prev => [...prev, ...createdItems]);
      
      toast({
        title: 'Bulk Create Successful',
        description: `${createdItems.length} ${entityName.toLowerCase()}s created successfully.`,
      });
      
      return createdItems;
    } catch (err) {
      const errorMessage = `Failed to create ${entityName.toLowerCase()}s`;
      setError(errorMessage);
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const bulkUpdate = async (updates: { id: string; data: Partial<T> }[]): Promise<T[]> => {
    setLoading(true);
    setError(null);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const updatedItems: T[] = [];
      
      setItems(prev => prev.map(item => {
        const update = updates.find(u => u.id === item.id);
        if (update) {
          const updatedItem = {
            ...item,
            ...update.data,
            updated: new Date().toISOString()
          };
          updatedItems.push(updatedItem);
          return updatedItem;
        }
        return item;
      }));
      
      toast({
        title: 'Bulk Update Successful',
        description: `${updatedItems.length} ${entityName.toLowerCase()}s updated successfully.`,
      });
      
      return updatedItems;
    } catch (err) {
      const errorMessage = `Failed to update ${entityName.toLowerCase()}s`;
      setError(errorMessage);
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const bulkDelete = async (ids: string[]): Promise<boolean> => {
    setLoading(true);
    setError(null);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 600));
      
      setItems(prev => prev.filter(item => !ids.includes(item.id)));
      
      toast({
        title: 'Bulk Delete Successful',
        description: `${ids.length} ${entityName.toLowerCase()}s deleted successfully.`,
      });
      
      return true;
    } catch (err) {
      const errorMessage = `Failed to delete ${entityName.toLowerCase()}s`;
      setError(errorMessage);
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const exportData = (format: 'json' | 'csv' | 'excel'): string | Blob => {
    try {
      switch (format) {
        case 'json':
          return JSON.stringify(items, null, 2);
        
        case 'csv':
          if (items.length === 0) return '';
          const headers = Object.keys(items[0]).join(',');
          const rows = items.map(item => 
            Object.values(item).map(value => 
              typeof value === 'string' && value.includes(',') 
                ? `"${value}"` 
                : value
            ).join(',')
          );
          return [headers, ...rows].join('\n');
        
        case 'excel':
          // For a real implementation, you'd use a library like xlsx
          const csvData = exportData('csv') as string;
          return new Blob([csvData], { type: 'application/vnd.ms-excel' });
        
        default:
          throw new Error('Unsupported export format');
      }
    } catch (err) {
      toast({
        title: 'Export Failed',
        description: 'Failed to export data',
        variant: 'destructive',
      });
      throw err;
    }
  };

  const importData = async (data: any[], format: 'json' | 'csv'): Promise<T[]> => {
    setLoading(true);
    setError(null);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      let processedData: Omit<T, 'id'>[];
      
      if (format === 'json') {
        processedData = data;
      } else if (format === 'csv') {
        // Process CSV data - this is a simplified implementation
        processedData = data as Omit<T, 'id'>[];
      } else {
        throw new Error('Unsupported import format');
      }
      
      const importedItems = await bulkCreate(processedData);
      
      toast({
        title: 'Import Successful',
        description: `${importedItems.length} ${entityName.toLowerCase()}s imported successfully.`,
      });
      
      return importedItems;
    } catch (err) {
      const errorMessage = `Failed to import ${entityName.toLowerCase()}s`;
      setError(errorMessage);
      toast({
        title: 'Import Failed',
        description: errorMessage,
        variant: 'destructive',
      });
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    items,
    loading,
    error,
    create,
    read,
    update,
    delete: deleteItem,
    search,
    filter,
    sort,
    bulkCreate,
    bulkUpdate,
    bulkDelete,
    export: exportData,
    import: importData
  };
}

// React import for useState
import React from 'react';
