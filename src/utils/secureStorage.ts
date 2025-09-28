// Secure storage utility with encryption for sensitive data
// This provides a layer of obfuscation for localStorage data

class SecureStorage {
  private readonly prefix = 'meridianAlgo_';

  // Simple obfuscation - in production, use proper encryption library
  private obfuscate(data: string): string {
    // Convert to base64 and reverse for basic obfuscation
    const base64 = btoa(unescape(encodeURIComponent(data)));
    return base64.split('').reverse().join('');
  }

  private deobfuscate(data: string): string {
    try {
      // Reverse the obfuscation process
      const base64 = data.split('').reverse().join('');
      return decodeURIComponent(escape(atob(base64)));
    } catch {
      return '';
    }
  }

  setItem(key: string, value: any): void {
    try {
      const data = JSON.stringify(value);
      const obfuscated = this.obfuscate(data);
      localStorage.setItem(this.prefix + key, obfuscated);
      // Also store in sessionStorage for redundancy
      sessionStorage.setItem(this.prefix + key, obfuscated);
      console.log(`SecureStorage: Successfully stored ${key}`);
    } catch (error) {
      console.error(`SecureStorage: Failed to save ${key}:`, error);
      // Try without obfuscation as fallback
      try {
        localStorage.setItem(this.prefix + key + '_fallback', JSON.stringify(value));
      } catch (fallbackError) {
        console.error('SecureStorage: Fallback storage also failed:', fallbackError);
      }
    }
  }

  getItem(key: string): any {
    try {
      // Try localStorage first
      let obfuscated = localStorage.getItem(this.prefix + key);
      
      // Fallback to sessionStorage if not in localStorage
      if (!obfuscated) {
        obfuscated = sessionStorage.getItem(this.prefix + key);
        // If found in session, restore to localStorage
        if (obfuscated) {
          localStorage.setItem(this.prefix + key, obfuscated);
        }
      }

      // Try fallback storage if main storage failed
      if (!obfuscated) {
        const fallback = localStorage.getItem(this.prefix + key + '_fallback');
        if (fallback) {
          console.log(`SecureStorage: Using fallback for ${key}`);
          return JSON.parse(fallback);
        }
      }

      if (!obfuscated) return null;

      const data = this.deobfuscate(obfuscated);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error(`SecureStorage: Failed to retrieve ${key}:`, error);
      // Try fallback
      try {
        const fallback = localStorage.getItem(this.prefix + key + '_fallback');
        if (fallback) {
          console.log(`SecureStorage: Using fallback for ${key} after error`);
          return JSON.parse(fallback);
        }
      } catch (fallbackError) {
        console.error('SecureStorage: Fallback retrieval failed:', fallbackError);
      }
      return null;
    }
  }

  removeItem(key: string): void {
    localStorage.removeItem(this.prefix + key);
    sessionStorage.removeItem(this.prefix + key);
  }

  clear(): void {
    // Clear only our app's data
    const keysToRemove: string[] = [];
    
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(this.prefix)) {
        keysToRemove.push(key);
      }
    }

    keysToRemove.forEach(key => {
      localStorage.removeItem(key);
      sessionStorage.removeItem(key);
    });
  }

  // Check if user data exists (for persistence check)
  hasUserData(): boolean {
    return !!(this.getItem('user') || this.getItem('users'));
  }

  // Migrate old unencrypted data if it exists
  migrateOldData(): void {
    try {
      // Check for old unencrypted user data
      const oldUser = localStorage.getItem('meridianAlgo_user');
      const oldUsers = localStorage.getItem('meridianAlgo_users');

      if (oldUser && !oldUser.startsWith('=')) { // Simple check if it's not obfuscated
        const userData = JSON.parse(oldUser);
        this.setItem('user', userData);
        localStorage.removeItem('meridianAlgo_user');
      }

      if (oldUsers && !oldUsers.startsWith('=')) {
        const usersData = JSON.parse(oldUsers);
        this.setItem('users', usersData);
        localStorage.removeItem('meridianAlgo_users');
      }
    } catch (error) {
      console.error('Migration failed:', error);
    }
  }
}

export const secureStorage = new SecureStorage();

// Initialize and migrate on load
if (typeof window !== 'undefined') {
  secureStorage.migrateOldData();
}
