import { MantineProvider, createTheme, Container, Loader, Center, Stack, Pagination, Alert, Group, Box, Text, TextInput, Button } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { useEffect } from 'react';
import { Header } from './components/Header';
import { Filters } from './components/Filters';
import { JobCard } from './components/JobCard';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import { fetchJobs } from './store/jobsSlice';
import { setSearch, setCity, addSkill, removeSkill, setPage } from './store/filtersSlice';
import '@mantine/core/styles.css';
import styles from './App.module.css';

const theme = createTheme({
  primaryColor: 'blue',
});

function App() {
  const dispatch = useAppDispatch();
  const { items, loading, error, pages } = useAppSelector((state) => state.jobs);
  const { search, city, skills, page } = useAppSelector((state) => state.filters);

  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch, search, city, skills, page]);

  if (loading) {
    return (
      <MantineProvider theme={theme}>
        <Header />
        <Container size="xl" style={{ paddingTop: 32 }}>
          <Center style={{ minHeight: 400 }}>
            <Loader size="xl" />
          </Center>
        </Container>
      </MantineProvider>
    );
  }

  if (error) {
    return (
      <MantineProvider theme={theme}>
        <Header />
        <Container size="xl" style={{ paddingTop: 32 }}>
          <Alert color="red" title="Ошибка">
            {error}
          </Alert>
        </Container>
      </MantineProvider>
    );
  }

  return (
    <MantineProvider theme={theme}>
      <Header />
      <Container size="xl" style={{ paddingTop: 32, paddingBottom: 32 }}>
        <Group className={styles.topRow} wrap="nowrap">
          <Box className={styles.titleWrapper}>
            <Text className={styles.titleMain}>
              Список вакансий
            </Text>
            <Text className={styles.titleSub}>
              по профессии Frontend-разработчик
            </Text>
          </Box>
          <Group gap="xs" className={styles.searchGroup}>
            <TextInput
              placeholder="Поиск по названию или компании..."
              value={search}
              onChange={(e) => dispatch(setSearch(e.currentTarget.value))}
              leftSection={<IconSearch size={16} />}
              className={styles.searchInput}
            />
            <Button variant="filled" color="blue">
              Найти
            </Button>
          </Group>
        </Group>

        <Group className={styles.mainRow} align="flex-start">
          <Box className={styles.leftColumn}>
            <Filters
              search={search}
              city={city}
              skills={skills}
              onSearchChange={(value) => dispatch(setSearch(value))}
              onCityChange={(value) => dispatch(setCity(value))}
              onAddSkill={(skill) => dispatch(addSkill(skill))}
              onRemoveSkill={(skill) => dispatch(removeSkill(skill))}
            />
          </Box>
          <Box className={styles.rightColumn}>
            <Stack gap="md">
              {items.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </Stack>

            {pages > 0 && (
              <Center style={{ marginTop: 24 }}>
                <Pagination
                  total={pages}
                  value={page}
                  onChange={(value) => dispatch(setPage(value))}
                />
              </Center>
            )}
          </Box>
        </Group>
      </Container>
    </MantineProvider>
  );
}

export default App;