You can customzie your application's response to light and dark modes using themes. Additionally, you can make use of theme to change the color palatte, typography size, font, and more.

Backstage upstream ships with a “unified theme interface” that acts as a thin layer over Material theming, adding additional Backstage specific components and concerns to the underlying Material theming framework. This interface supports two versions of Material theming: v4 and v5.

The theme set on the development backstage app isn’t set or available for any of the individual development setups, for example running the development setup for a plugin in the default light or dark upstream theme. Ideally, each of these development environments could pull in the same theme file so that regardless of how a given plugin UI is developed the developer is able to work with a consistent theme where UI components lay out and behave as expected. Fortunately, the `createDevApp` API that these environments rely on can also accept new themes.

```ts
createDevApp()
  .addThemes([
    {
      id: "my-theme",
      title: "My Custom Theme",
      variant: "light",
      icon: <LightIcon />,
      Provider: ({ children }) => (
        <UnifiedThemeProvider theme={myTheme} children={children} />
      ),
    },
  ])
  .registerApi({
    // Additional code
  });
```

`myTheme` would look like this:

```ts title="myTheme.ts"
import {
  createBaseThemeOptions,
  createUnifiedTheme,
  palettes,
} from "@backstage/theme";

export const myTheme = createUnifiedTheme({
  ...createBaseThemeOptions({
    palette: {
      ...palettes.light,
      background: {
        default: "#d5d6db",
        paper: "#d5d6db",
      },
      banner: {
        info: "#34548a",
        error: "#8c4351",
        text: "#343b58",
        link: "#565a6e",
      },
      navigation: {
        background: "#343b58",
        indicator: "#8f5e15",
        color: "#d5d6db",
        selectedColor: "#ffffff",
      },
    },
  }),
  fontFamily: "Comic Sans MS",
});
```

The `ExampleFetchComponent` leverages themes to alter the chip styles accordingly:

```ts title="ExampleFetchComponent.tsx"
import { Theme } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";

export const getChipStyle = (theme: Theme) => {
  return {
    backgroundColor: theme.palette.type === "dark" ? "#3d5061" : "#e7f1fa",
  };
};

export const DenseTable = ({ users }: any) => {
  const theme = useTheme();
  const chipStyle = getChipStyle(theme);

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

  // Additional code
};
```

For more details on theming, refer to the [official documentation](https://backstage.io/docs/getting-started/app-custom-theme)
