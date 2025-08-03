/** @type {import('dependency-cruiser').IConfiguration} */
module.exports = {
    options: {
        doNotFollow: {
            dependencyTypes: ['npm', 'npm-dev', 'npm-optional', 'npm-peer', 'npm-bundled', 'npm-no-pkg']
        },
        includeOnly: '^src',
        tsPreCompilationDeps: false,
        tsConfig: { fileName: './tsconfig.json' },
        externalModuleResolutionStrategy: 'yarn-pnp',
        progress: { type: 'performance-log' },

        reporterOptions: {
            archi: {
                collapsePattern: '^src/app/[^/]+|^src/pages/[^/]+|^src/features/[^/]+|^src/ui-kit/[^/]+',

                theme: {
                    modules: [
                        // ❶ Общие атрибуты для всех карточек — меньшее поле, компактный шрифт/рамка
                        {
                            criteria: {},
                            attributes: {
                                shape: 'tab',
                                margin: '0.03,0.03', // было по умолчанию ~0.11 — уменьшили "паддинг" карточек
                                fontsize: '10', // компактнее подписи
                                penwidth: '1' // тоньше рамки
                            }
                        },
                        // ❷ Сохраняем ваши цвета для групп
                        { criteria: { collapsed: true }, attributes: { shape: 'tab' } },
                        { criteria: { source: '^src/app/[^/]+' }, attributes: { fillcolor: '#ffbdbd' } },
                        { criteria: { source: '^src/pages/[^/]+' }, attributes: { fillcolor: '#ffd9a3' } },
                        { criteria: { source: '^src/features/[^/]+' }, attributes: { fillcolor: '#aedaff' } },
                        { criteria: { source: '^src/ui-kit/[^/]+' }, attributes: { fillcolor: '#efefef' } }
                    ],

                    graph: {
                        splines: 'ortho',
                        rankdir: 'TB',
                        // ❸ Уменьшаем расстояния между рядами и узлами
                        ranksep: '0.4', // было '1' — вертикальные промежутки между рангами
                        nodesep: '0.25', // горизонтальные промежутки между нодами
                        pad: '0.1' // поля по краю всего графа (уменьшили общий “воздух”)
                        // Дополнительно можно поэкспериментировать:
                        // margin: '0.02', // внутренние поля графа (иногда влияет у dot)
                    }
                }
            }
        }
    }
};
