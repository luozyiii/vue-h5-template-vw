<template>
  <div class="about">
    <h1>This is an about page</h1>
    <div id="example"></div>
    <!-- <div aspectratio w-188-246 class="color"></div> -->
  </div>
</template>

<style lang="scss" scoped>
.color {
  background-color: red;
}
[w-188-246] {
  aspect-ratio: '188:246';
}
@svg square {
  @rect {
    fill: var(--color, black);
    width: 100%;
    height: 100%;
  }
}

#example {
  height: 1px;
  background: white svg(square param(--color #00b1ff));
}

</style>
