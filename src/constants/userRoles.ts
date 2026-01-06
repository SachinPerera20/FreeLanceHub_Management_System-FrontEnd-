export const USER_ROLES = {
    CLIENT: 'client',
    
  } as const;
  
  export type UserRole = typeof USER_ROLES[keyof typeof USER_ROLES];
  