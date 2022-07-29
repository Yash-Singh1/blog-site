import type { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import Profile from '../components/Profile/Profile';
import { useTina } from 'tinacms/dist/edit-state';
import { gql, staticRequest } from 'tinacms';
import { Query } from '../../.tina/__generated__/types';
import { useEffect } from 'react';
import AOS from 'aos';
import { graphql } from '@octokit/graphql';
import type RepoInfo from '../types/RepoInfo';
import type SkillsGrouped from '../types/skillsGrouped';

const query = gql`
  {
    home(relativePath: "Home.json") {
      description
      projects
      skills {
        name
        status
        icon
        link
        circlize
      }
    }
  }
`;

const Home: NextPage<{
  data: Query;
  repoInfo: { [key: string]: RepoInfo };
  skillsGrouped: SkillsGrouped;
}> = (props) => {
  const { data } = useTina<Query>({
    query,
    variables: {},
    data: props.data,
  });
  useEffect(() => {
    AOS.init({ duration: 500 });
  }, []);

  return (
    <>
      <Head>
        <title>Saiansh (Yash) Singh</title>
        <meta
          name='description'
          content="Hey There! It's Saiansh (Yash) Singh. I am a middle school programmer working on many different cool, stuff. This is my personal website + blog."
        />
        <meta property='og:type' content='website' />
      </Head>

      <main>
        <Profile data={data.home} repoInfo={props.repoInfo} skillsGrouped={props.skillsGrouped} />
      </main>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  let data: Query = {} as Query;
  try {
    data = (await staticRequest({
      query,
      variables: {},
    })) as Query;
  } catch {}
  let repoInfo: {
    [key: string]: RepoInfo;
  } = {};
  try {
    for (const project of data.home.projects!) {
      const repo = await graphql<RepoInfo>(
        gql`
          query RepositoryInfo($name: String!, $owner: String!) {
            repository(name: $name, owner: $owner) {
              description
              primaryLanguage {
                color
                name
              }
              stargazerCount
              forkCount
              name
              url
            }
          }
        `,
        {
          name: project!,
          owner: 'Yash-Singh1',
          headers: {
            authorization: `bearer ${process.env.GH_TOKEN}`,
          },
        }
      );
      repoInfo[project!] = repo;
    }
  } catch {}

  const skillsGrouped: SkillsGrouped = {};
  data.home.skills!.forEach!((skill) => {
    if (!skillsGrouped[skill!.status!]) {
      skillsGrouped[skill!.status!] = [];
    }
    skillsGrouped[skill!.status!]!.push(skill!);
  });

  return {
    props: {
      data,
      repoInfo,
      skillsGrouped,
    },
    revalidate: 60 * 60, // Rebuild every hour
  };
};

export default Home;
