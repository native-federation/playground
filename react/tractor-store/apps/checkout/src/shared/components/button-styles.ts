export const buttonStyles = `
.c_Button--size-normal { --button-height: 50px; }
.c_Button--size-small { --button-height: 40px; }

.c_Button {
  display: block;
  height: var(--button-height);
  width: 100%;
  border-radius: calc(var(--button-height) / 2);
  padding: 2px;
  border: 0;
  background:
    linear-gradient(180deg, rgb(168 168 168), rgb(255 255 255)),
    var(--accent-color);
  box-shadow:
    0 -2px 3px rgb(229 229 229),
    0 2px 3px 2px rgb(255 255 255),
    0 0 25px rgba(0 0 0 / 5%),
    0 -10px 5px rgb(255 255 255) inset;
  position: relative;
  text-transform: uppercase;
  letter-spacing: 0.3em;
  -webkit-tap-highlight-color: rgb(0 0 0 / 0%);
  text-decoration: none;
  font-size: 16px;
  cursor: pointer;
  font-family: inherit;
  color: inherit;
}

.c_Button--primary { --accent-color: #333; color: #fff; }
.c_Button--secondary { --accent-color: #fff; color: #000; }

.c_Button--rounded.c_Button--size-normal { width: var(--button-height); }

@media (max-width: 499px) {
  .c_Button--rounded.c_Button--size-normal { --button-height: 40px; }
}
@media (min-width: 500px) {
  .c_Button--rounded.c_Button--size-normal { --button-height: 66px; }
}

.c_Button--rounded.c_Button--size-small {
  --button-height: 40px;
  width: var(--button-height);
}

.c_Button--rounded .c_Button__inner { padding: 0; }

@media (max-width: 499px) {
  .c_Button--rounded svg { width: 20px; height: 20px; }
}

.c_Button[disabled] {
  --accent-color: #d3d3d3;
  pointer-events: none;
}

.c_Button::before {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background:
    linear-gradient(0deg, rgba(0 0 0 / 19%), rgba(255 255 255 / 30%)),
    var(--accent-color);
  content: '';
  box-shadow: 0 2px 1px -1px rgba(0 0 0 / 10%);
  display: block;
  transition:
    transform 0.3s,
    box-shadow 0.3s,
    background 0.1s 0.2s;
}

.c_Button__inner {
  position: relative;
  padding-left: 20px;
  padding-right: 20px;
  background-color: var(--accent-color);
  height: calc(var(--button-height) - 4px);
  border-radius: inherit;
  display: grid;
  place-content: center;
  transition:
    transform 0.3s,
    background 0.3s,
    box-shadow 0.3s;
  -webkit-user-select: none;
  user-select: none;
  white-space: nowrap;
}

.c_Button:hover .c_Button__inner,
.c_Button:focus .c_Button__inner {
  background:
    linear-gradient(0deg, rgba(0 0 0 / 5%), rgba(0 0 0 / 5%)),
    var(--accent-color);
}

.c_Button:active::before {
  background:
    linear-gradient(0deg, rgba(0 0 0 / 9%), rgba(0 0 0 / 16%)),
    var(--accent-color);
  box-shadow:
    0 0 3px rgba(0 0 0 / 60%) inset,
    0 2px 1px -1px rgba(0 0 0 / 10%);
  transform: scale(0.97);
  transition:
    all 0.1s,
    background 0.05s;
}

.c_Button:active .c_Button__inner {
  transform: scale(0.97);
  background:
    linear-gradient(0deg, rgba(0 0 0 / 10%), rgba(0 0 0 / 10%)),
    var(--accent-color);
  transition: all 0.1s;
  box-shadow:
    0 5px 5px rgba(0 0 0 / 20%) inset,
    0 -3px 3px rgba(255 255 255 / 20%) inset;
}
`;
