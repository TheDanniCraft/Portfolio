"use client";

import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
	"react-pdf/node_modules/pdfjs-dist/build/pdf.worker.min.mjs",
	import.meta.url,
).toString();

export function CvPdfPreview({ url }: { url: string }) {
	const [pageCount, setPageCount] = useState<number>();

	return (
		<Document
			file={url}
			onLoadSuccess={({ numPages }) => setPageCount(numPages)}
			loading={<div className='p-6 text-sm text-muted'>Loading CV...</div>}
			error={<div className='p-6 text-sm text-accent'>Could not load CV.</div>}
			className='block bg-black'
		>
			{Array.from({ length: pageCount ?? 0 }, (_, index) => (
				<Page
					key={index}
					pageNumber={index + 1}
					scale={1.35}
					renderTextLayer={false}
					renderAnnotationLayer={false}
					className='block'
				/>
			))}
		</Document>
	);
}
