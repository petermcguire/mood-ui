import { describe, it, expect } from "vitest";
import {key, useAuth} from "./useAuth";
import { LoginResponse } from "../services/api/apiService.ts";

describe("useAuth", () => {

  const testResponse: LoginResponse = {
    accessToken: "testToken",
    userId: 1
  }; // A mock LoginResponse object

  beforeEach(() => {
    // Clear all mocks and anything stored in localStorage before each test
    localStorage.clear();
  });

  it("should call signIn and store loginResponse in localStorage", () => {
    const { signIn } = useAuth();

    signIn(testResponse);

    // Verify that the item was stored in localStorage
    expect(localStorage.getItem(key)).toEqual(JSON.stringify(testResponse));
  });

  it("should call signOut and remove loginResponse from localStorage", () => {
    const { signIn, signOut } = useAuth();

    // First, sign in to store the loginResponse
    signIn(testResponse);

    // Then, sign out
    signOut();

    // Ensure the item no longer exists in localStorage
    expect(localStorage.getItem(key)).toBeNull();
  });

  it("should return true for isLogged when loginResponse exists in localStorage", () => {
    const { signIn, isLogged } = useAuth();

    // First, simulate signing in
    signIn(testResponse);

    // Check if isLogged returns true when something is stored
    expect(isLogged()).toBe(true);
  });

  it("should return false for isLogged when loginResponse does not exist in localStorage", () => {
    const { isLogged } = useAuth();

    // Ensure nothing is stored in localStorage
    expect(isLogged()).toBe(false);
  });

  it("should call getKey and get proper key back", () => {
    // first fill localStorage with test key
    localStorage.setItem(key, JSON.stringify(testResponse));
    const { getKey } = useAuth();
    expect(getKey()).toEqual(testResponse);
  });

  it("should call getKey and get null when no key stored", () => {
    const { getKey } = useAuth();
    expect(getKey()).toEqual(null);
  });
});