# 🐨 👀 Koala Watcher

This is a project designed to create live scratchpad environments for
working with node. It watches for file changes and reruns files whilst
printing their output.

### Installation

```sh
git clone https://github.com/domtronn/koala-watcher
cd koala-watcher
npm link
```

### Running

There are two run cases, 

+ Vanilla
+ Babelified

```sh
# Vanilla
koala-watch <src-dir>

# Babelified
koala-watch <src-dir> -b <path-to-babelrc> -o <build-dir>
```

For example,

```sh
koala-watch src -b ./.babelrc -o build
```
