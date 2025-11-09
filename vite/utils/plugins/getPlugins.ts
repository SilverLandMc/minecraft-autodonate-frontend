import eslintHighlightsPlugin from '@nabla/vite-plugin-eslint';
import { sentryVitePlugin } from '@sentry/vite-plugin';
import basicSsl from '@vitejs/plugin-basic-ssl';
import reactSupportPlugin from '@vitejs/plugin-react';
import { ConfigEnv, createLogger, PluginOption } from 'vite';
import { analyzer } from 'vite-bundle-analyzer';
import svgSupportPlugin from 'vite-plugin-svgr';
import tsAliasesSupportPlugin from 'vite-tsconfig-paths';
import packageInfo from '../../../package.json';
import { BUILD_VERSION, isAnalyze, SENTRY_TOKEN, SENTRY_URL } from '../../constants/environment';

const logger = createLogger('info', { prefix: '[getPlugins]' });

const commonPlugins: PluginOption[] = [svgSupportPlugin(), reactSupportPlugin(), tsAliasesSupportPlugin()];

const pluginsByCommand: Record<ConfigEnv['command'], PluginOption[]> = {
    // запуск
    serve: [eslintHighlightsPlugin({ eslintOptions: {} }), basicSsl()],
    // сборка
    build: []
};

if (isAnalyze) {
    logger.info('using analyzer plugin...');
    pluginsByCommand.build.push(analyzer({ openAnalyzer: false, analyzerMode: 'server' }));
}

if (SENTRY_URL && SENTRY_TOKEN) {
    logger.info('using sentry source map uploader plugin...');

    let releaseName = `${packageInfo.name}@${packageInfo.version}`;
    releaseName = BUILD_VERSION ? `${releaseName}+${BUILD_VERSION}` : releaseName;

    pluginsByCommand.build.push(
        sentryVitePlugin({
            org: '37b',
            telemetry: false,
            url: SENTRY_URL,
            authToken: SENTRY_TOKEN,
            errorHandler: (error) => {
                // пропал загрузки source map'ов не должен останавливать сборку
                // eslint-disable-next-line no-console
                console.warn('sentry vite plugin: uploading failed');
                // eslint-disable-next-line no-console
                console.warn(error);
            },
            project: packageInfo.name,
            release: {
                name: releaseName,
                inject: false,
                dist: 'build'
            },
            sourcemaps: {
                filesToDeleteAfterUpload: ['**/*.js.map', '**/*.css.map']
            }
        })
    );
}

const getPlugins = (command: ConfigEnv['command']) => [...commonPlugins, ...pluginsByCommand[command]];

export default getPlugins;
