import { IBirthday } from "./IBirthday";

export interface ICharacter {
    name: string;
    url: string;
    likes: number;
    image: string;
    gender: string;
    dateOfBirth: IBirthday | null;
    age: string;
    bloodType: string;
}
