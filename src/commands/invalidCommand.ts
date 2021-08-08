import { Command } from "../types";

const invalidCommand: Command = () => {
};

invalidCommand.ableToProcess = () => false;

export default invalidCommand;
