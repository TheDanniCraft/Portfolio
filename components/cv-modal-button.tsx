"use client";

import { Button, Modal } from "@heroui/react";
import { FileArrowDown } from "@gravity-ui/icons";
import dynamic from "next/dynamic";

const CvPdfPreview = dynamic(() => import("@/components/cv-pdf-preview").then((mod) => mod.CvPdfPreview), {
	ssr: false,
});

const cvUrl = "https://storage.cloud.thedannicraft.de/assets/CV-TheDanniCraft.pdf";

export function CvModalButton() {
	return (
		<Modal>
			<Button size='lg' variant='outline' className='p-6'>
				View CV
			</Button>

			<Modal.Backdrop variant='blur' className='bg-black/80'>
				<Modal.Container placement='center' scroll='inside'>
					<Modal.Dialog className='relative w-fit max-w-[94vw] overflow-hidden border border-border bg-black p-0 text-foreground'>
						<Modal.CloseTrigger className='z-20' />

						<Modal.Body className='max-h-[92vh] overflow-auto p-0'>
							<CvPdfPreview url={cvUrl} />
						</Modal.Body>

						<div className='absolute bottom-3 right-3 z-20 flex gap-2'>
							<Button size='sm' onPress={() => window.open(cvUrl, "_blank", "noopener,noreferrer")}>
								<FileArrowDown />
								Download
							</Button>
						</div>
					</Modal.Dialog>
				</Modal.Container>
			</Modal.Backdrop>
		</Modal>
	);
}
