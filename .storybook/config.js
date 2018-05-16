import React from 'react';
import { configure, storiesOf } from '@storybook/react';

function loadStories() {
  require('../stories/index.js');
}

configure(loadStories, module);
