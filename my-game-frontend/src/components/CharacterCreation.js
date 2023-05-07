import React, { useState, useEffect, useCallback } from 'react';
import styled from '@emotion/styled';
import axios from 'axios';

const CharacterCreationWrapper = styled.div`
  padding: 20px;
  background-color: #f5f5f5;
  border: 1px solid #ccc;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Input = styled.input`
  padding: 5px;
`;

const Button = styled.button`
  padding: 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  cursor: pointer;
`;

const CharacterCreation = () => {
  const [name, setName] = useState('');
  const [classSelected, setClassSelected] = useState('');
  const [attributes, setAttributes] = useState({
    strength: 0,
    intelligence: 0,
    wisdom: 0,
    constitution: 0,
    dexterity: 0,
    charisma: 0,
  });
  const [appearance, setAppearance] = useState('');

  const classes = [
    'Barbarian',
    'Bard',
    'Cleric',
    'Druid',
    'Fighter',
    'Monk',
    'Paladin',
    'Ranger',
    'Rogue',
    'Sorcerer',
    'Warlock',
    'Wizard',
  ];

  const generateCharacterAppearance = useCallback(async () => {
    try {
      const response = await axios.post('https://api.openai.com/v1/images/generations', {
        prompt: `Generate an image of a ${classSelected} with a ${name}`,
        model: 'image-alpha-001',
        num_images: 1,
        size: '512x512',
        // Add your OpenAI API key and other settings
      }, {
        headers: {
          'Authorization': `Bearer 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`,
        }
      });
      setAppearance(response.data.data[0].url);
    } catch (error) {
      console.error(error);
    }
  }, [classSelected, name]);

  useEffect(() => {
    if (classSelected) {
      generateRandomAttributes();
      generateCharacterAppearance();
    }
  }, [classSelected, generateCharacterAppearance]);

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const handleClassChange = (e) => {
    setClassSelected(e.target.value);
  };

  const generateRandomAttributes = () => {
    const newAttributes = {
      strength: Math.floor(Math.random() * 20) + 1,
      intelligence: Math.floor(Math.random() * 20) + 1,
      wisdom: Math.floor(Math.random() * 20) + 1,
      constitution: Math.floor(Math.random() * 20) + 1,
      dexterity: Math.floor(Math.random() * 20) + 1,
      charisma: Math.floor(Math.random() * 20) + 1,
    };
    setAttributes(newAttributes);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save the character
  };

  return (
    <CharacterCreationWrapper>
      <h2>Create Your Character</h2>
      <Form onSubmit={handleSubmit}>
        <label htmlFor="name">Character Name:</label>
        <Input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="class">Class:</label>
        <select
          id="class"
          name="class"
          value={classSelected}
          onChange={handleClassChange}
        >
          <option value="">Choose a class</option>
          {classes.map((cls) => (
            <option key={cls} value={cls}>
            {cls}
          </option>
        ))}
      </select>
      <br />
      {classSelected && (
        <>
          <h3>Attributes:</h3>
          <ul>
            {Object.entries(attributes).map(([attr, value]) => (
              <li key={attr}>
                {attr}: {value}
              </li>
            ))}
          </ul>
          <h3>Appearance:</h3>
          {appearance ? (
            <>
              <img src={appearance} alt={`${name} the ${classSelected}`} />
              <Button type="button" onClick={generateCharacterAppearance}>
                Regenerate Appearance
              </Button>
            </>
          ) : (
            <p>Loading appearance...</p>
          )}
        </>
      )}
      <br />
      <Button type="submit">Save Character</Button>
    </Form>
  </CharacterCreationWrapper>
);
};

export default CharacterCreation;

