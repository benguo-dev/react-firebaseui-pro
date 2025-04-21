# react-firebaseui-pro

react-firebaseui-pro is a React component that provides seamless integration with Firebase Authentication using the FirebaseUI library. It simplifies the process of adding authentication flows to your React applications and is fully compatible with both React 18 and React 19.

## Features
- React Compatibility: Works with both React 18 and React 19.
- Multiple Authentication Providers: Supports Google, Facebook, Twitter, GitHub, Microsoft, Apple, email/password, phone, and anonymous login.
- Customizable UI: Easily style the component using the className prop.
- FirebaseUI Integration: Built on top of the FirebaseUI library for a robust and reliable authentication experience.
- TypeScript Support: Includes TypeScript definitions for type safety.

## Demo

**Live demo: [Default style](https://react-firebaseui-pro.vercel.app/)**

**Live demo: [Icon style](https://react-firebaseui-pro-demo2.vercel.app/)**

## Getting started

### Installation

```shell
npm install react-firebaseui-pro
```

### Usage

```js
// Default style
<ReactFirebaseuiPro uiConfig={uiConfig} firebaseAuth={firebaseAuth} />
```
<img src="./src/assets/firebaseAuthUI.png" alt="Default style" width="80%" />


```js
// Style with className="firebaseui-icon"
<ReactFirebaseuiPro uiConfig={uiConfig} firebaseAuth={firebaseAuth} className="firebaseui-icon" />
```
<img src="./src/assets/firebaseAuthUI-icon.png" alt="Style with className='firebaseui-icon'" width="80%" />


```js
// Style with className="firebaseui-icon round"
<ReactFirebaseuiPro uiConfig={uiConfig} firebaseAuth={firebaseAuth} className="firebaseui-icon round" />
```
<img src="./src/assets/firebaseAuthUI-icon-round.png" alt="Style with className='firebaseui-icon round'" width="80%" />

## License

[MIT](https://opensource.org/licenses/MIT)


