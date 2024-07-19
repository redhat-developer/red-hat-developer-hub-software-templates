import React from "react";
import { Typography, Grid, makeStyles } from "@material-ui/core";
import {
  InfoCard,
  Header,
  Page,
  Content,
  ContentHeader,
  HeaderLabel,
  SupportButton,
} from "@backstage/core-components";
import { ExampleFetchComponent } from "../ExampleFetchComponent";

const usePaperStyles = makeStyles((theme) => ({
  body: {
    backgroundColor: theme.palette.background.paper,
  },
}));

export const ExampleComponent = () => {
  const classes = usePaperStyles();
  return (
    <Page themeId="tool">
      <Header
        title="Welcome to ${{values.plugin_id}}"
        subtitle="Optional subtitle"
      >
        <HeaderLabel label="Owner" value="Team X" />
        <HeaderLabel label="Lifecycle" value="Alpha" />
      </Header>
      <Content className={classes.body}>
        <ContentHeader title="Plugin title">
          <SupportButton>A description of your plugin goes here.</SupportButton>
        </ContentHeader>
        <Grid container spacing={3} direction="column">
          <Grid item>
            <InfoCard title="Information card">
              <Typography variant="body1">
                All content should be wrapped in a card like this.
              </Typography>
            </InfoCard>
          </Grid>
          <Grid item>
            <ExampleFetchComponent />
          </Grid>
        </Grid>
      </Content>
    </Page>
  );
};
