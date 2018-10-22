const BodyClass = {
  oninit: (vnode) => {
    BodyClass.set(vnode.attrs.classList);
  },
  onupdate: (vnode) => {
    BodyClass.set(vnode.attrs.classList);
  },
  set: (classList) => {
    document.body.classList.value = classList.join(' ');
  },
  view: () => {}
};

export default BodyClass;