/**
 * Options for configuring the format-preserving encryption.
 */
export interface FpeOptions {
  /**
   * Secret key used for creating a cipher.
   * @remarks Must be a non-empty string.
   */
  secret: string;
  /**
   * Domain array for the cipher.
   * @remarks Defaults to the digits ['1','2',..., '0'] if not provided.
   */
  domain?: string[];
}

/**
 * Format-Preserving Encryption (FPE) interface.
 */
export interface Fpe {
  /**
   * Encrypts the given text using format-preserving encryption.
   * @param text - The text to encrypt.
   * @returns The encrypted string.
   * @throws Will throw an error if input is not a string or if any character is not in the domain.
   */
  encrypt(text: string): string;

  /**
   * Decrypts the given text that was encrypted using format-preserving encryption.
   * @param text - The text to decrypt.
   * @returns The decrypted string.
   * @throws Will throw an error if input is not a string or if any character is not in the domain.
   */
  decrypt(text: string): string;
}

/**
 * Creates a format-preserving encryption (FPE) instance.
 *
 * @param options - An object containing the secret key and an optional domain.
 * @returns An FPE instance with `encrypt` and `decrypt` methods.
 *
 * @example
 * ```typescript
 * import fpe from 'node-fpe';
 *
 * const cipher = fpe({ secret: 'secret!' });
 *
 * const encrypted = cipher.encrypt('1234567');
 * const decrypted = cipher.decrypt(encrypted);
 * ```
 *
 * @throws {Error} If the secret is not provided.
 */
declare function fpe(options: FpeOptions): Fpe;

export default fpe;
