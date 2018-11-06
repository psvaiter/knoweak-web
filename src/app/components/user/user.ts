class User {
    id: number;
    fullName: string;
    email: string;
    password: string;
    createdOn: Date;
    lastModifiedOn: Date;
    lastLoggedInOn: Date;
    lastLoginAttemptedOn: Date;
    failedLoginAttemptCount: number;
    lockedOutOn: Date;
    blockedOn: Date;
    roles: SystemRole[] = [];
}

class SystemRole {
    id: number;
    name: string;
}