import React from "react";
import useAsync from "react-use/lib/useAsync";
import {
  Table,
  TableColumn,
  Progress,
  ResponseErrorPanel,
} from "@backstage/core-components";
import { discoveryApiRef, useApi } from "@backstage/core-plugin-api";
import { Avatar, Chip } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import { getChipStyle } from "../../utils/getChipStyle";

type User = {
  repoUrl: string;
  githubId: string;
  type: string;
};

export const DenseTable = ({ users }: any) => {
  const theme = useTheme();
  const chipStyle = getChipStyle(theme);
  const columns: TableColumn[] = [
    { title: "GithubId", field: "githubId" },
    { title: "Repository URL", field: "repoUrl" },
    { title: "Type", field: "type" },
  ];

  const data = users.map((user: any) => {
    return {
      id: user.login,
      githubId: (
        <Chip
          style={chipStyle}
          avatar={<Avatar alt={user.login} src={user.avatar_url} />}
          label={user.login}
          variant="outlined"
        />
      ),
      repoUrl: user.html_url,
      type: user.type,
    };
  });

  return (
    <Table
      title="Github Users"
      options={{ search: false, paging: true }}
      columns={columns}
      data={data}
    />
  );
};

export const ExampleFetchComponent = () => {
  const discoveryApi = useApi(discoveryApiRef);
  const proxyURL = discoveryApi.getBaseUrl("proxy");

  const { value, loading, error } = useAsync(async (): Promise<User[]> => {
    const res = await fetch(`${await proxyURL}/github/users`);
    const users = await res.json();
    return users;
  }, []);

  if (loading) {
    return <Progress />;
  } else if (error) {
    return <ResponseErrorPanel error={error} />;
  }

  return <DenseTable users={value || []} />;
};
