type Options = {
  required?: boolean;
  trimWhitespace?: boolean;
}

/**
 * Gets the value of an environment variable.
 * Unless trimWhitespace is set to false, the value is also trimmed.
 * Returns an empty string if the value is not defined.
 *
 * @param     name     name of the input to get
 * @param     options  optional. See InputOptions.
 * @returns   string
 */
export const getEnvValue = (name: string, options?: Options) => {
  const value = process.env[name.replace(/ /g, "_")] || "";
  if (options && options.required && !value) {
    throw new Error(`Environment variable required and not supplied: ${name}`);
  }

  if (options && options.trimWhitespace === false) {
    return value;
  }

  return value.trim();
};
