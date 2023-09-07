import React, { useState } from 'react';

const CountryCard: React.FC<{ country: string; flag: string; points: number, teamId: string, checked: boolean }> = ({ country, flag, points, teamId, checked }) => {

  return (
    <div
      id={teamId}
      className={`country-card font-sans ${checked ? 'border-green-400' : 'border-gray-300'}`}
      style={{
        width: '6.5rem',
        cursor: 'pointer',
      }}
    >
      <div className={`border-2 rounded-xl p-1 px-2 mb ${checked ? 'border-green-400' : 'border-gray-300'}`}>
        <h2 className="text-center font-semibold mb-2" style={{ fontSize: '0.5rem' }}>
          {country}
        </h2>
        <img src={flag} alt={`${country} Flag`} style={{ width: '10rem', height: '3rem' }} className="mb-2" />
      </div>
      <p className="text-xs font-semibold text-center text-points">{points} pts</p>
    </div>
  );
};

export default CountryCard;
