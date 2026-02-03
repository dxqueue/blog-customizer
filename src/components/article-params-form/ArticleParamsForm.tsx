import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';
import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';

type Props = {
	defaultValues: ArticleStateType;
	onApply: (state: ArticleStateType) => void;
};

export const ArticleParamsForm = ({ defaultValues, onApply }: Props) => {
	const [menuOpen, setMenuOpen] = useState(false);
	const [formState, setFormState] = useState(defaultValues);
	const asideRef = useRef<HTMLElement | null>(null);

	const handleToggle = () => {
		setMenuOpen((prev) => !prev);
	};

	useEffect(() => {
		const handleClick = (event: MouseEvent) => {
			if (
				asideRef.current &&
				!asideRef.current.contains(event.target as Node)
			) {
				setMenuOpen(false);
			}
		};

		if (menuOpen) {
			document.addEventListener('mousedown', handleClick);
		}

		return () => {
			document.removeEventListener('mousedown', handleClick);
		};
	});

	const handleChange = (key: keyof ArticleStateType, value: any) => {
		setFormState((prev) => ({
			...prev,
			[key]: value,
		}));
	};

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		onApply(formState);
		setMenuOpen(false);
	};

	const handleReset = () => {
		setFormState(defaultArticleState);
		onApply(defaultArticleState);
	};

	return (
		<>
			<ArrowButton isOpen={menuOpen} onClick={handleToggle} />
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: menuOpen,
				})}
				ref={asideRef}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<Text size={31} weight={800} uppercase align='left'>
						Задайте параметры
					</Text>
					<div className={styles.content}>
						<Select
							selected={formState.fontFamilyOption}
							options={fontFamilyOptions}
							onChange={(value) => handleChange('fontFamilyOption', value)}
							title='Шрифт'
						/>
						<RadioGroup
							name=''
							options={fontSizeOptions}
							selected={formState.fontSizeOption}
							onChange={(value) => handleChange('fontSizeOption', value)}
							title='Размер шрифта'
						/>
						<Select
							selected={formState.fontColor}
							options={fontColors}
							onChange={(value) => handleChange('fontColor', value)}
							title='Цвет шрифта'
						/>
					</div>
					<Separator />
					<div className={styles.content}>
						<Select
							selected={formState.backgroundColor}
							options={backgroundColors}
							onChange={(value) => handleChange('backgroundColor', value)}
							title='Цвет фона'
						/>
						<Select
							selected={formState.contentWidth}
							options={contentWidthArr}
							onChange={(value) => handleChange('contentWidth', value)}
							title='Ширина контента'
						/>
					</div>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
