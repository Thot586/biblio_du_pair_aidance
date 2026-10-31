import { buildPrompt, EMPTY_PROMPT, findSensitiveData } from './promptLogic';

describe('buildPrompt', () => {
  it('reste vide tant que rien n’est rempli', () => {
    expect(buildPrompt(EMPTY_PROMPT)).toBe('');
  });

  it('assemble les cinq éléments de la méthode ACTIF', () => {
    const prompt = buildPrompt({
      action: 'Propose dix mots-clés',
      context: 'Je prépare un mémoire de DU sur la pair-aidance',
      tone: 'simple',
      identity: 'documentaliste en santé mentale',
      format: 'un tableau',
      askQuestions: true,
    });
    expect(prompt).toBe(
      [
        'Tu es documentaliste en santé mentale.',
        'Je prépare un mémoire de DU sur la pair-aidance.',
        'Propose dix mots-clés.',
        'Utilise un ton simple.',
        'Présente ta réponse ainsi : un tableau.',
        'Avant de répondre, pose-moi trois questions pour mieux comprendre ce que je cherche.',
      ].join('\n'),
    );
  });

  it('ne double pas la ponctuation', () => {
    expect(buildPrompt({ ...EMPTY_PROMPT, action: 'Que proposes-tu ?', askQuestions: false })).toBe(
      'Que proposes-tu ?',
    );
  });
});

describe('findSensitiveData', () => {
  const labels = (text: string) => findSensitiveData(text).map((match) => match.label);

  it('ne signale rien dans une demande générale', () => {
    expect(findSensitiveData('Une personne hospitalisée l’an dernier, en addictologie.')).toEqual(
      [],
    );
  });

  it('repère un nom, un âge et une date', () => {
    expect(labels('Mme Dupont, 42 ans, hospitalisée le 12 mars 2026.')).toEqual([
      'une date précise',
      'un âge exact',
      'une personne nommée',
    ]);
  });

  it('repère un e-mail et un téléphone', () => {
    expect(labels('Contact : alix@exemple.fr ou 06 12 34 56 78')).toEqual([
      'une adresse e-mail',
      'un numéro de téléphone',
    ]);
  });

  it('repère le nom d’un établissement', () => {
    expect(labels('Elle a été suivie à la clinique Saint-Paul.')).toEqual([
      'le nom d’un établissement',
    ]);
  });
});
