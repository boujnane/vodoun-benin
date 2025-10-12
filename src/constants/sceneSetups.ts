
export const SCENE_SETUPS = {
  masks: {
    lights: [
      { position: [0, 2, 5], intensity: 40, color: '#ffb86c' },
      { position: [0, 2, -6], intensity: 70, color: '#ffb86c' },
      { position: [-5, 1.5, -0.5], intensity: 27, color: '#ffb86c' },
      { position: [5, 2, 0.5], intensity: 35, color: '#ffb86c' },
    ],
    camera: { position: [0, 0, 16], fov: 35 },
    float: true,
  },
  zangbetos: {
    lights: [
      { position: [0, 3, 6], intensity: 50, color: '#88ffcc' },
      { position: [2, 2, -3], intensity: 30, color: '#44ffaa' },
    ],
    camera: { position: [0, 0, 12], fov: 45 },
    float: false,
  },
  pipes: {
    lights: [
      { position: [0, 2, 5], intensity: 20, color: '#fff' },
    ],
    camera: { position: [0, 0, 15], fov: 30 },
    float: false,
  },
  statues: {
    lights: [
      { position: [0, 2, 5], intensity: 25, color: '#ffddaa' },
      { position: [3, 2, -2], intensity: 20, color: '#ffaa88' },
    ],
    camera: { position: [0, 0, 14], fov: 40 },
    float: false,
  },
};
