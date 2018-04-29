class User {
    id: number;
    fullName: string;
    email: string;
    createdOn: DateTimeFormat;
    lastModifiedOn: DateTimeFormat;
    lastLoggedInOn: DateTimeFormat;
    lastLoginAttemptedOn: DateTimeFormat;
    failedLoginAttemptCount: number;
    lockedOutOn: DateTimeFormat;
    blockedOn: DateTimeFormat;
    roles: SystemRole[] = [];
}

class SystemRole {
    id: number;
    name: string;
}