# eslint-formatter-mo

[![npm version](https://img.shields.io/npm/v/eslint-formatter-mo?style=flat-square)](https://www.npmjs.com/package/eslint-formatter-mo)
[![actions status](https://img.shields.io/github/actions/workflow/status/fengzilong/eslint-formatter-mo/release.yml?style=flat-square)](https://github.com/fengzilong/eslint-formatter-mo/actions/workflows/release.yml)
[![npm downloads](https://img.shields.io/npm/dm/eslint-formatter-mo?style=flat-square)](https://www.npmjs.com/package/eslint-formatter-mo)
[![awesome](https://awesome.re/mentioned-badge-flat.svg)](https://github.com/dustinspecker/awesome-eslint)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat-square)](https://github.com/semantic-release/semantic-release)

Good-lookin' ESLint formatter

<img src="media/screenshot.jpg" alt="screenshot" width="700px">

🎊 Obviously it's more human-readable 🎉🎉🎉

> [!NOTE]
> This library was moved to ESM from v2.
> 
> If v2 doesn't work well with your Node.js version, check the 1.x version for better compatibility.

# Features

- 🎯 Line number
- 🌈 Code highlight
- ⚓️ Position pointer
- 🦄 Error/Warning detail
- 🍻 Auto-fixable is also marked
- 📄 File-level summary
- 📋 Total summary
- 🥳 **Support 50+ VSCode Syntax themes (New feature from v2)**
- 🎊 **Support JSON/Markdown/CSS syntax highlighting (New feature from v2)**

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

Thanks to [shiki](https://github.com/shikijs/shiki), now we support 50+ VSCode syntax themes in v2.

You can choose your favorite theme by specifying `MO_THEME` environment variable.

```shell
MO_THEME=<theme_id> eslint [patterns] -f mo
```

theme_id | preview |
---------|----------
 one-dark-pro | <img src="./media/themes/one-dark-pro.jpg" alt="one-dark-pro" width="360" />
 dracula | <img src="./media/themes/dracula.jpg" alt="dracula" width="360" />
 night-owl | <img src="./media/themes/night-owl.jpg" alt="night-owl" width="360" />
 vitesse-dark | <img src="./media/themes/vitesse-dark.jpg" alt="vitesse-dark" width="360" />
 nord | <img src="./media/themes/nord.jpg" alt="nord" width="360" />
 ... | ...

[Here](https://shiki.style/themes) are the all available 50+ VSCode syntax themes.

# More screenshots

## Summary

<img src="media/file-level-summary.jpg" alt="file-level-summary" width="300px" />

<img src="media/summary.jpg" alt="summary" width="300px" />

## More languages

JSON
<img src="media/json.jpg" alt="JSON" width="300px" />

Markdown
<img src="media/markdown.jpg" alt="Markdown" width="300px" />

CSS
<img src="media/css.jpg" alt="CSS" width="300px" />

# License

MIT
