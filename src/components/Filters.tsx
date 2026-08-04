import { Select, Box, Text } from '@mantine/core';
import { SkillsInput } from './SkillsInput';
import styles from './Filters.module.css';

interface FiltersProps {
  search: string;
  city: string;
  skills: string[];
  onSearchChange: (value: string) => void;
  onCityChange: (value: string) => void;
  onAddSkill: (skill: string) => void;
  onRemoveSkill: (skill: string) => void;
}

export const Filters = ({
  city,
  skills,
  onCityChange,
  onAddSkill,
  onRemoveSkill,
}: FiltersProps) => {
  return (
    <Box>
      <Text className={styles.skillsLabel}>
        Ключевые навыки
      </Text>
      <SkillsInput
        skills={skills}
        onAdd={onAddSkill}
        onRemove={onRemoveSkill}
      />

      <Select
        label="Город"
        value={city}
        onChange={(value) => onCityChange(value || 'Все')}
        data={['Все', 'Москва', 'Санкт-Петербург']}
        className={styles.citySelect}
      />
    </Box>
  );
};