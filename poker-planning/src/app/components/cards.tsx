import React from 'react';

interface CardProps {
    user: string;
    vote: string;
}

const Card: React.FC<CardProps> = ({ user, vote }) => {
    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white p-4 m-2">
            <div className="font-bold text-xl mb-2">{user}</div>
            <p className="text-gray-700 text-base">
                Vote: <span className="font-semibold">{vote}</span>
            </p>
        </div>
    );
};

export default Card;
