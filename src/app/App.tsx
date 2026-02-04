import { CSSProperties, useState } from 'react';
import { Article } from 'src/components/article';
import { ArticleParamsForm } from 'src/components/article-params-form/ArticleParamsForm';
import {
	ArticleStateType,
	defaultArticleState,
} from 'src/constants/articleProps';

import 'src/styles/index.scss';
import styles from 'src/styles/index.module.scss';

export const App = () => {
	const [currentArticleState, setCurrentArticleState] =
		useState<ArticleStateType>(defaultArticleState);

	return (
		<main
			className={styles.main}
			style={
				{
					'--font-family': currentArticleState.fontFamilyOption.value,
					'--font-size': currentArticleState.fontSizeOption.value,
					'--font-color': currentArticleState.fontColor.value,
					'--container-width': currentArticleState.contentWidth.value,
					'--bg-color': currentArticleState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				defaultValues={currentArticleState}
				onApply={setCurrentArticleState}
			/>
			<Article />
		</main>
	);
};
