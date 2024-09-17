export interface CreateWalletRequest {
  userId: number;
  currency: string;
  password: string;
  isDefault: boolean;
}
