# eslint-formatter-mo

![npm version](https://img.shields.io/npm/v/eslint-formatter-mo)
![npm downloads](https://img.shields.io/npm/dm/eslint-formatter-mo)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![actions status](https://github.com/fengzilong/eslint-formatter-mo/workflows/Release/badge.svg)](https://github.com/fengzilong/eslint-formatter-mo/actions/workflows/release.yml)

Good-lookin' ESLint formatter

<img src="media/screenshot.jpg" alt="screenshot" width="700px">

🎊 Obviously it's more human-readable 🎉🎉🎉

> [!NOTE]
> This library was moved to ESM from v2.
> 
> If ESM doesn't work well with your Node.js version, check the 1.x version for CJS compatibility.

# Features

- 🎯 Line number
- 🌈 Code highlight
- ⚓️ Position pointer
- 🦄 Error/Warning detail
- 🍻 Auto-fixable is also marked
- 📄 File-level summary
- 📋 Total summary
- 🥳 **Support 50+ VSCode Syntax themes (New feature from v2)**

# Installation

```shell
npm i eslint-formatter-mo -D
```

# Usage

Simply append `-f mo` to your eslint command

`eslint [patterns] -f mo`

> -f is short for --format

See [ESLint Formatters](https://eslint.org/docs/latest/use/formatters/#eslint-formatters) for detail

# Themes

Thanks to [shiki](https://github.com/shikijs/shiki), we now support 50+ VSCode syntax themes in v2.

And you can choose your favorite theme by specifying `MO_THEME` environment variable.

```shell
MO_THEME=<theme_id> eslint [patterns] -f mo
```

theme_id | preview |
---------|----------
 one-dark-pro | <img src="./media/themes/one-dark-pro.jpg" alt="one-dark-pro" width="260" />
 dracula | <img src="./media/themes/dracula.jpg" alt="dracula" width="260" />
 night-owl | <img src="./media/themes/night-owl.jpg" alt="night-owl" width="260" />
 vitesse-dark | <img src="./media/themes/vitesse-dark.jpg" alt="vitesse-dark" width="260" />
 nord | <img src="./media/themes/nord.jpg" alt="nord" width="260" />
 ... | ...

[Here](https://shiki.style/themes) you can find all the 50+ themes.

# More screenshots

<img src="media/file-level-summary.jpg" alt="file-level-summary" width="300px">

<img src="media/summary.jpg" alt="summary" width="300px">

# License

MIT
