'use server';
/**
 * @fileOverview An AI agent that recommends the most relevant Google Form to submit
 * based on a partner's natural language description of their business need or question.
 *
 * - partnerFormSuggester - A function that handles the form recommendation process.
 * - PartnerFormSuggesterInput - The input type for the partnerFormSuggester function.
 * - PartnerFormSuggesterOutput - The return type for the partnerFormSuggester function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const serviceForms = [
  {
    name: 'Form Permintaan Surat Keterangan Umroh Jamaah',
    category: 'Pengajuan Dokumen',
    description: 'Permintaan surat keterangan untuk keperluan umroh jamaah.',
    link: 'https://forms.gle/919jxKEAjfiC8xd6A',
  },
  {
    name: 'Form Pengajuan Cuti Jamaah',
    category: 'Pengajuan Dokumen',
    description: 'Pengajuan cuti khusus untuk jamaah.',
    link: 'https://forms.gle/iiSAdMn83uf7jffJ9',
  },
  {
    name: 'Form Permintaan Surat Rekomendasi Passport',
    category: 'Pengajuan Dokumen',
    description: 'Permintaan surat rekomendasi untuk pengurusan passport.',
    link: 'https://forms.gle/rEamrqTboHKzGDFc6',
  },
  {
    name: 'Form Pemesanan Landing Page',
    category: 'Marketing',
    description: 'Pemesanan pembuatan landing page untuk keperluan marketing atau promosi.',
    link: 'https://forms.gle/61KK33u47qGwKHHk6',
  },
  {
    name: 'Form Pemesanan Iklan Sosial Media',
    category: 'Marketing',
    description: 'Pemesanan layanan iklan di media sosial untuk campaign atau promosi.',
    link: 'https://forms.gle/8DLwDzzQ8nuMpfWWA',
  },
  {
    name: 'Form Pendaftaran Seminar',
    category: 'Event',
    description: 'Pendaftaran untuk mengikuti seminar atau workshop yang diadakan.',
    link: 'https://forms.gle/g6AyzniLi6cdrkN97',
  },
  {
    name: 'Form Report Seminar',
    category: 'Event',
    description: 'Pelaporan hasil atau aktivitas seminar setelah acara.',
    link: 'https://forms.gle/vcbdhU35THB67jpQYA',
  },
  {
    name: 'Form Pendaftaran Mitra Baru',
    category: 'Kemitraan',
    description: 'Pendaftaran untuk menjadi mitra baru dan bergabung dalam program kemitraan.',
    link: 'https://forms.gle/svVpJjctUbGDNFDz8',
  },
  {
    name: 'Data Isian Pre-Order Amitra',
    category: 'Kemitraan',
    description: 'Formulir untuk mengisi data pre-order produk Amitra.',
    link: 'https://forms.gle/mdByM6sVB7tGoaKSA',
  },
  {
    name: 'Form Pemesanan Kalender Samira 2025',
    category: 'Merchandise',
    description: 'Pemesanan kalender Samira tahun 2025.',
    link: 'https://forms.gle/n6bWrETCKMTXQ9eC8',
  },
];

const PartnerFormSuggesterInputSchema = z.object({
  partnerDescription: z
    .string()
    .describe("A natural language description of the partner's business need or question."),
});
export type PartnerFormSuggesterInput = z.infer<typeof PartnerFormSuggesterInputSchema>;

const PartnerFormSuggesterOutputSchema = z.object({
  recommendedForm: z.object({
    name: z.string().describe('The name of the recommended Google Form.'),
    category: z.string().describe('The category of the recommended Google Form.'),
    link: z.string().url().describe('The URL link to the recommended Google Form.'),
    reason: z
      .string()
      .describe('A brief explanation of why this form is recommended based on the description.'),
  }).describe('The most relevant Google Form recommended based on the partner\'s description.'),
});
export type PartnerFormSuggesterOutput = z.infer<typeof PartnerFormSuggesterOutputSchema>;

export async function partnerFormSuggester(
  input: PartnerFormSuggesterInput,
): Promise<PartnerFormSuggesterOutput> {
  return partnerFormSuggesterFlow(input);
}

const prompt = ai.definePrompt({
  name: 'partnerFormSuggesterPrompt',
  input: { schema: PartnerFormSuggesterInputSchema },
  output: { schema: PartnerFormSuggesterOutputSchema },
  prompt: `Anda adalah asisten AI yang membantu mitra menemukan formulir Google yang paling relevan.

Berikut adalah daftar formulir yang tersedia:
{{#each forms}}
  - Nama: {{{this.name}}}
    Kategori: {{{this.category}}}
    Deskripsi: {{{this.description}}}
    Link: {{{this.link}}}
{{/each}}

Mitra telah memberikan deskripsi kebutuhan mereka sebagai berikut:

"""{{{partnerDescription}}}"""

Berdasarkan deskripsi mitra dan daftar formulir yang tersedia, rekomendasikan satu formulir Google yang paling relevan. Jelaskan mengapa Anda merekomendasikan formulir tersebut.

Sertakan hanya satu objek JSON di output Anda, yang sesuai dengan skema output.`,
});

const partnerFormSuggesterFlow = ai.defineFlow(
  {
    name: 'partnerFormSuggesterFlow',
    inputSchema: PartnerFormSuggesterInputSchema,
    outputSchema: PartnerFormSuggesterOutputSchema,
  },
  async (input) => {
    const { output } = await prompt({
      partnerDescription: input.partnerDescription,
      forms: serviceForms, // Pass the list of forms to the prompt
    });
    return output!;
  },
);
