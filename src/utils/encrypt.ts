import bcrypt from "bcrypt";

export interface IEncrypt {
	encrypt(password: string): Promise<string>;
	compare(password: string, hash: string): Promise<boolean>;
}

export class Encrypt implements IEncrypt {
	private salt = 10;

	/*************  ✨ Codeium Command 🌟  *************/
	/**
	 * Encrypts a plaintext password using bcrypt.
	 *
	 * @param password - The plaintext password to be encrypted.
	 * @returns A promise that resolves to the hashed password.
	 */

	async encrypt(password: string): Promise<string> {
		const hash = await bcrypt.hash(password, this.salt);
		return hash;
	}
	/******  3ca0628c-5d86-4c1f-9704-b62ebba3a36c  *******/
	/**
	 * Compares a plaintext password with a hashed password to check for a match.
	 *
	 * @param password - The plaintext password to be compared.
	 * @param hash - The hashed password to compare against.
	 * @returns A promise that resolves to true if the password matches the hash, otherwise false.
	 */

	async compare(password: string, hash: string): Promise<boolean> {
		return await bcrypt.compare(password, hash);
	}
}
