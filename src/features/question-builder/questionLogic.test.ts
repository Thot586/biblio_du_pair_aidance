import { EMPTY_ANSWERS, reviewQuestion, suggestQuestions, withDe } from './questionLogic';

describe('withDe', () => {
  it('contracte comme en français', () => {
    expect(withDe('la pair-aidance')).toBe('de la pair-aidance');
    expect(withDe('le soutien')).toBe('du soutien');
    expect(withDe('les pairs')).toBe('des pairs');
    expect(withDe('un groupe')).toBe('d’un groupe');
    expect(withDe('entraide')).toBe('d’entraide');
  });
});

describe('suggestQuestions', () => {
  it('attend au moins le thème et les personnes concernées', () => {
    expect(suggestQuestions({ ...EMPTY_ANSWERS, what: 'la pair-aidance' })).toEqual([]);
  });

  it('assemble les réponses en débuts de question', () => {
    const [first] = suggestQuestions({
      ...EMPTY_ANSWERS,
      what: 'la pair-aidance',
      who: 'les équipes soignantes',
      where: 'dans un service hospitalier',
    });
    expect(first).toBe(
      'Comment les équipes soignantes perçoivent-ils ou perçoivent-elles la place de la pair-aidance dans un service hospitalier ?',
    );
  });
});

describe('reviewQuestion', () => {
  it('ne dit rien tant que le champ est vide', () => {
    expect(reviewQuestion('   ')).toEqual([]);
  });

  it('accepte une question claire', () => {
    expect(
      reviewQuestion('Comment une personne pair-aidante trouve-t-elle sa place dans une équipe ?'),
    ).toEqual([]);
  });

  it('signale une question fermée', () => {
    expect(
      reviewQuestion('Est-ce que la pair-aidance marche vraiment en équipe mobile ?'),
    ).toContain('On peut y répondre par oui ou non. Essayez « Comment » ou « En quoi ».');
  });

  it('signale un avis caché et le manque de lien avec la pair-aidance', () => {
    const remarks = reviewQuestion('Pourquoi les soignants refusent-ils de travailler avec nous ?');
    expect(remarks).toContain(
      'Un mot de votre question semble contenir un avis. Gardez-la neutre.',
    );
    expect(remarks).toContain('Vérifiez que le lien avec la pair-aidance est clair.');
  });

  it('rappelle le point d’interrogation', () => {
    expect(reviewQuestion('Comment une personne pair-aidante trouve sa place')).toContain(
      'Terminez par un point d’interrogation.',
    );
  });
});
