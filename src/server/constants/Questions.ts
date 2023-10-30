import { Question } from "../../defs/Question";

export const Questions: Question[] = [
    {
        question: 'Which team won the 1946 FA cup, beating Charlton Athletic in the final?',
        answers: [
            {
                value: 'Derby County',
                correct: true
            },
            {
                value: 'Tottenham Hotspur',
                correct: false,
            },
            {
                value: 'Plymouth Argyle',
                correct: false,
            },
            {
                value: 'Everton',
                correct: false
            }
        ]
    },
    {
        question: 'What was interesting about the 1894 English Football League Match between Sunderland and Derby County?',
        answers: [
            {
                value: 'The ball burst',
                correct: false
            },
            {
                value: 'Last game to be played without nets',
                correct: false,
            },
            {
                value: 'Both sides wore red and white stripes',
                correct: false,
            },
            {
                value: 'The match had three halves',
                correct: true
            }
        ]
    }
]