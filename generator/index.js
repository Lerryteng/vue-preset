module.exports = (api, options, rootOptions) => {
  // 小程序
  if (options.preset === 'mini') {
    api.extendPackage(
      {
        scripts: {
          serve: null,
          build: null
        },
        dependencies: {
          vue: null
        },
        devDependencies: {
          '@vue/cli-plugin-babel': null,
          'vue-cli-plugin-qrcode': null,
          '@vue/cli-service': null,
          chalk: null,
          'internal-ip': null,
          less: null,
          'less-loader': null,
          'qrcode-terminal': null
        }
      },
      {
        prune: true
      }
    );

    api.extendPackage({
      name: 'miniprogram',
      version: '1.0.0',
      private: true,
      description: 'mini program app',
      templateInfo: {
        name: 'taro-ui-vue',
        typescript: true,
        css: 'sass'
      },
      scripts: {
        'build:weapp': 'taro build --type weapp',
        'build:swan': 'taro build --type swan',
        'build:alipay': 'taro build --type alipay',
        'build:tt': 'taro build --type tt',
        'build:h5': 'taro build --type h5',
        'build:rn': 'taro build --type rn',
        'build:qq': 'taro build --type qq',
        'build:jd': 'taro build --type jd',
        'build:quickapp': 'taro build --type quickapp',
        'dev:weapp': 'npm run build:weapp -- --watch',
        'dev:swan': 'npm run build:swan -- --watch',
        'dev:alipay': 'npm run build:alipay -- --watch',
        'dev:tt': 'npm run build:tt -- --watch',
        'dev:h5': 'npm run build:h5 -- --watch',
        'dev:rn': 'npm run build:rn -- --watch',
        'dev:qq': 'npm run build:qq -- --watch',
        'dev:jd': 'npm run build:jd -- --watch',
        'dev:quickapp': 'npm run build:quickapp -- --watch'
      },
      browserslist: ['last 3 versions', 'Android >= 4.1', 'ios >= 8'],
      author: 'winner-fed',
      dependencies: {
        '@babel/runtime': '^7.7.7',
        '@tarojs/cli': '3.1.4',
        '@tarojs/components': '3.1.4',
        '@tarojs/runtime': '3.1.4',
        '@tarojs/taro': '3.1.4',
        lodash: '4.17.15',
        'vue-template-compiler': '^2.5.0',
        vue: '^2.5.0',
        'taro-ui-vue': '^1.0.0-alpha.5'
      },
      devDependencies: {
        '@babel/core': '^7.8.0',
        '@tarojs/mini-runner': '3.1.4',
        '@tarojs/webpack-runner': '3.1.4',
        '@types/webpack-env': '^1.13.6',
        'babel-preset-taro': '3.1.4',
        eslint: '^6.8.0',
        'vue-loader': '^15.9.2',
        'eslint-plugin-vue': '^6.x',
        'eslint-config-taro': '3.1.4',
        stylelint: '9.3.0',
        '@typescript-eslint/parser': '^2.x',
        '@typescript-eslint/eslint-plugin': '^2.x',
        typescript: '^3.7.0'
      }
    });

    // 删除 vue-cli3 默认目录
    api.render((files) => {
      Object.keys(files)
        .filter((path) => path.startsWith('src/') || path.startsWith('public/'))
        .forEach((path) => delete files[path]);
    });

    api.render('./miniprogram');
    // 屏蔽 generator 之后的文件写入操作
    // writeFileTree 函数不写文件直接退出，这样 vue-cli3 在写 README.md 时会直接跳过
    api.onCreateComplete(() => {
      process.env.VUE_CLI_SKIP_WRITE = true;
    });
    return;
  }
  // 命令
  api.extendPackage({
    scripts: {
      bootstrap:
        'yarn --registry https://registry.npm.taobao.org || npm install --registry https://registry.npm.taobao.org || cnpm install',
      serve: 'vue-cli-service serve',
      lint: 'vue-cli-service lint',
      'lint:style': 'vue-cli-service lint:style',
      'lint:prettier': 'check-prettier lint',
      report: 'vue-cli-service build --report',
      new: 'plop',
      deploy: 'npm run build && npm run zip',
      prettier: 'node ./scripts/prettier.js',
      release: 'sh build/release.sh',
      inspect: 'vue inspect > output.js --verbose',
      reinstall:
        'rimraf node_modules && rimraf yarn.lock && rimraf package-lock.json && npm run bootstrap'
    },
    'scripts-info': {
      serve: '运行开发服务器',
      build: '生产环境执行构建',
      analyz: '生产环境执行构建打包分析',
      deploy: '生产环境执行构建并压缩zip包',
      see: '生成 see 平台部署发布物'
    }
  });

  if (options.language === 'ts') {
    api.extendPackage({
      scripts: {
        build: 'node build/index.ts',
        zip: 'node build/zip.ts'
      },
      devDependencies: {
        typescript: '~3.9.3'
      }
    });
  } else {
    api.extendPackage({
      scripts: {
        build: 'node build/index.js',
        zip: 'node build/zip.js'
      }
    });
  }

  // 公共依赖包
  api.extendPackage({
    dependencies: {
      '@winner-fed/cloud-utils': '*',
      '@winner-fed/magicless': '*',
      axios: '0.19.2',
      'normalize.css': '8.0.1'
    },
    devDependencies: {
      '@winner-fed/eslint-config-win': '^1.0.2',
      '@vue/eslint-config-prettier': '^6.0.0',
      '@winner-fed/stylelint-config-win': '^0.1.0',
      '@winner-fed/vue-cli-plugin-eslint': '^1.0.2',
      '@winner-fed/vue-cli-plugin-stylelint': '^1.0.2',
      'add-asset-html-webpack-plugin': '^3.1.3',
      archiver: '^3.0.0',
      'babel-eslint': '^10.0.1',
      chalk: '^2.4.1',
      'check-prettier': '^1.0.3',
      'compression-webpack-plugin': '^3.0.0',
      'less-loader': '^7.3.0',
      rimraf: '^3.0.2',
      eslint: '^7.6.0',
      plop: '^2.3.0',
      prettier: '^1.19.1',
      'script-ext-html-webpack-plugin': '^2.1.3',
      stylelint: '^13.6.1',
      'svn-info': '^1.0.0',
      tasksfile: '^5.1.0',
      'webpack-manifest-plugin': '^3.0.0',
      webpackbar: '^4.0.0',
      'webstorm-disable-index': '^1.2.0'
    }
  });

  if (options.language === 'ts') {
    api.extendPackage({
      dependencies: {
        'register-service-worker': '1.7.2'
      },
      devDependencies: {
        '@types/node': '^10.14.17',
        '@types/webpack-env': '^1.14.0',
        '@typescript-eslint/eslint-plugin': '^2.33.0',
        '@typescript-eslint/parser': '^2.33.0',
        '@vue/cli-plugin-pwa': '~4.5.0',
        '@vue/cli-plugin-typescript': '~4.5.0',
        '@vue/eslint-config-typescript': '^5.0.2'
      }
    });
  }

  // vue preset 版本
  if (options.preset === 'v2') {
    api.extendPackage({
      dependencies: {
        'vue-router': '3.5.1',
        'vue-svgicon': '3.2.6'
      },
      devDependencies: {
        '@liwb/vue-router-invoke-webpack-plugin': '^0.3.2'
      }
    });

    api.extendPackage({
      scripts: {
        svg: 'vsvg -s ./src/icons/svg -t ./src/icons/components --ext js --es6'
      }
    });

    if (options.language === 'ts') {
      api.extendPackage({
        dependencies: {
          'vue-class-component': '7.2.6',
          'vue-property-decorator': '9.1.2'
        }
      });
    }
  } else {
    // v3
    // vue3 不需要 vue-template-compiler
    // 因此移除 vue2 及 vue-template-compiler
    // 消除 warning
    api.extendPackage(
      {
        dependencies: {
          vue: null
        },
        devDependencies: {
          'vue-template-compiler': null
        }
      },
      {
        prune: true
      }
    );

    api.extendPackage({
      dependencies: {
        '@yzfe/svgicon': '1.0.1',
        '@yzfe/vue3-svgicon': '1.0.1',
        vue: '3.0.5',
        'vue-router': '4.0.3'
      },
      devDependencies: {
        '@vue/compiler-sfc': '^3.0.0',
        '@yzfe/svgicon-loader': '^1.0.1',
        '@yzfe/vue-cli-plugin-svgicon': '~1.0.1'
      }
    });
  }

  // postcss
  api.extendPackage({
    postcss: {
      plugins: {
        autoprefixer: {}
      }
    }
  });

  // 支持see平台发布物
  if (options['see-package']) {
    api.extendPackage({
      scripts: {
        see: 'npm run build && node build/package/see.js'
      },
      devDependencies: {
        '@winner-fed/winner-deploy': '^2.0.0'
      }
    });
  }

  // application 应用类型为 mobile
  if (options.application === 'mobile' || options.application === 'offline') {
    api.extendPackage({
      dependencies: {
        'lib-flexible': '0.3.2'
      },
      devDependencies: {
        'postcss-pxtorem': '^4.0.1'
      },
      postcss: {
        plugins: {
          'postcss-pxtorem': {
            rootValue: 37.5,
            unitPrecision: 2,
            propList: [
              'height',
              'line-height',
              'width',
              'padding',
              'margin',
              'top',
              'left',
              'right',
              'bottom',
              'font-size'
            ],
            selectorBlackList: [],
            replace: true,
            mediaQuery: false,
            minPixelValue: 1
          }
        }
      }
    });
  }

  // application 应用类型为 H5离线包
  if (options.application === 'offline') {
    api.extendPackage({
      dependencies: {
        'light-sdk': '^2.0.4',
        '@winner-fed/native-bridge-methods': '*'
      }
    });
  }

  // 删除 vue-cli3 默认目录
  api.render((files) => {
    Object.keys(files)
      .filter((path) => path.startsWith('src/') || path.startsWith('public/'))
      .forEach((path) => delete files[path]);
  });

  if (options['ui-framework'] === 'element-ui') {
    require('./element.js')(api, options);
  } else if (options['ui-framework'] === 'iview') {
    require('./iview.js')(api, options);
  } else if (options['ui-framework'] === 'ant') {
    require('./ant.js')(api, options);
  } else if (options['ui-framework'] === 'hui') {
    require('./hui.js')(api, options);
  } else if (options['mobile-ui-framework'] === 'vant') {
    require('./vant.js')(api, options);
  }

  if (options.preset === 'v2') {
    if (options.language === 'js') {
      // 公共基础目录和文件
      api.render('./template');
    } else {
      api.render('./ts-template');
    }
  } else {
    if (options.language === 'js') {
      // 公共基础目录和文件
      api.render('./template-v3');
    } else {
      api.render('./ts-template-v3');
    }
  }

  api.postProcessFiles((files) => {
    Object.keys(files).forEach((name) => {
      // 只有离线包才有这个文件
      if (options.application !== 'offline') {
        delete files['offlinePackage.json'];
      }

      // 是否为公司内部项目
      if (!options['mirror-source']) {
        delete files['.npmrc'];
        delete files['.yarnrc'];
      }

      // 是否支持see平台发布物
      if (!options['mirror-source'] || !options['see-package']) {
        // 删除 build/package 文件夹
        if (/^build\/package[/$]/.test(name)) {
          delete files[name];
        }
      }
      // PC项目
      if (options['application'] === 'pc') {
        delete files['public/console.js'];
        delete files['public/vconsole.min.js'];
      }
    });
  });

  // 屏蔽 generator 之后的文件写入操作
  // writeFileTree 函数不写文件直接退出，这样 vue-cli3 在写 README.md 时会直接跳过
  api.onCreateComplete(() => {
    process.env.VUE_CLI_SKIP_WRITE = true;
  });
};
