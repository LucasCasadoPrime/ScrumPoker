export interface Message {
    source: string;
    tag: 'join' | 'vote' | 'reveal' | 'reset';
}
