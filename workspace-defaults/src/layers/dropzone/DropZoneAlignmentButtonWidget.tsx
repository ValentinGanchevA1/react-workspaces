import * as React from 'react';
import { useRef, useState } from 'react';
import styled from '@emotion/styled';
import { Alignment } from '@projectstorm/react-workspaces-core';
import { useMouseDragEvents } from '@projectstorm/react-workspaces-core';

export interface DropZoneAlignmentButtonWidgetProps {
	alignment: Alignment;
}

const SPLIT_THICK = 13;
const SPLIT_LENGTH = 60;
const SPLIT_MARGIN = 8;

export const DropZoneAlignmentButtonWidget: React.FC<DropZoneAlignmentButtonWidgetProps> = (props) => {
	const [entered, setEntered] = useState(false);
	const ref = useRef<HTMLDivElement>();
	useMouseDragEvents({
		forwardRef: ref,
		mouseEnter: () => {
			setEntered(true);
		},
		mouseExit: () => {
			setEntered(false);
		}
	});

	const vertical = props.alignment === Alignment.LEFT || props.alignment === Alignment.RIGHT;

	let width = SPLIT_THICK;
	let height = SPLIT_LENGTH;
	if (!vertical) {
		width = SPLIT_LENGTH;
		height = SPLIT_THICK;
	}

	return (
		<S.SplitContainer ref={ref} vertical={vertical} alignment={props.alignment} hover={entered}>
			<S.SplitContainerIcon hover={entered} width={width} height={height} />
		</S.SplitContainer>
	);
};

namespace S {
	export const SplitContainer = styled.div<{ alignment: Alignment; hover: boolean; vertical: boolean }>`
		${(p) => p.alignment}: 0;
		position: absolute;
		width: ${(p) => (p.vertical ? '30px' : '100%')};
		height: ${(p) => (!p.vertical ? '30px' : '100%')};
		pointer-events: all;
		display: flex;
		align-items: center;
		justify-content: center;
	`;

	export const SplitContainerIcon = styled.div<{ width: number; height: number; hover: boolean }>`
		border-radius: 2px;
		background: ${(p) => (p.hover ? 'orange' : '#0096ff')};
		transition: background 0.3s, width ease-out 0.3s, height ease-out 0.3s;
		transition-delay: 0.1s;
		pointer-events: none;

		width: ${(p) => (p.hover ? '100%' : `${p.width}px`)};
		height: ${(p) => (p.hover ? '100%' : `${p.height}px`)};
	`;
}
