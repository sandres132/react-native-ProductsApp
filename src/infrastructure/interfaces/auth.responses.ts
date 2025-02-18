
export interface AuthResponse {
    id:       string;
    email:    string;
    fullName: string;
    isActive: boolean;
    roles:    string[];
    token:    string;
}

export interface BadResponse {
    statusCode: number;
    message:    string[];
    error:      string;
}
