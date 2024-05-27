import { evaluate } from "mathjs";
import { IMathSolver } from "../contract/IMathSolver";

export class MathSolver implements IMathSolver {
    solve(expression: string): number {
        return evaluate(expression);
    }

}