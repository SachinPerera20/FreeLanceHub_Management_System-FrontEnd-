export const USER_ROLES = {
    CLIENT: 'client',
    FREELANCER: 'freelancer',
    ADMIN: 'admin',
  } as const;
  
  export type UserRole = typeof USER_ROLES[keyof typeof USER_ROLES];
  