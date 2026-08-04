import { useState } from 'react';
import type { KeyboardEvent } from 'react';
import { Pill, Group, TextInput, Button, Box } from '@mantine/core';
import styles from './SkillsInput.module.css';

interface SkillsInputProps {
  skills: string[];
  onAdd: (skill: string) => void;
  onRemove: (skill: string) => void;
}

export const SkillsInput = ({ skills, onAdd, onRemove }: SkillsInputProps) => {
  const [value, setValue] = useState('');

  const handleAdd = () => {
    if (value.trim()) {
      onAdd(value.trim());
      setValue('');
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAdd();
    }
  };

  return (
    <Box>
      <Group gap="xs" className={styles.inputGroup}>
        <TextInput
          placeholder="Добавить навык..."
          value={value}
          onChange={(e) => setValue(e.currentTarget.value)}
          onKeyDown={handleKeyDown}
          className={styles.skillInput}
        />
        <Button onClick={handleAdd} variant="filled" color="blue">
          +
        </Button>
      </Group>
      <Group gap="sm" wrap="wrap" className={styles.pillsGroup}>
        {skills.map((skill) => (
          <Pill
            key={skill}
            withRemoveButton
            onRemove={() => onRemove(skill)}
            className={styles.pill}
          >
            {skill}
          </Pill>
        ))}
      </Group>
    </Box>
  );
};