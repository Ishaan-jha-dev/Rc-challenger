export type Question = {
  id: string;
  questionNumber: number;
  questionText: string;
  questionType: 'central_idea' | 'inference' | 'tone' | 'detail';
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  explanation: {
    whyCorrect: string;
    whyWrong: {
      A?: string;
      B?: string;
      C?: string;
      D?: string;
    };
    commonTrap: string;
    strategyTip: string;
  };
};

export type RCPassage = {
  id: string;
  date: string;
  title: string;
  passage: string;
  difficulty: 'Medium' | 'Hard';
  topicCategory: string;
  wordCount: number;
  estimatedTimeMinutes: number;
  questions: Question[];
};

export const mockRCs: RCPassage[] = [
  {
    id: 'rc-1',
    date: new Date().toISOString().split('T')[0],
    title: 'The Ethics of Artificial General Intelligence',
    passage: `As artificial intelligence systems grow increasingly sophisticated, the philosophical discourse surrounding their potential evolution into Artificial General Intelligence (AGI) has shifted from speculative fiction to urgent ethical consideration. While narrow AI operates within strictly bounded parameters—optimizing logistics or generating predictive text—AGI implies a cognitive plasticity comparable to human intelligence, capable of generalized learning and autonomous goal formulation. The primary ethical dilemma does not necessarily lie in the dystopian trope of machine malevolence, but rather in the alignment problem: ensuring that an entity with potentially superintelligent capabilities intrinsically values human flourishing. Some ethicists argue that value alignment is fundamentally intractable because human values are themselves notoriously nebulous, contradictory, and culturally contingent. Thus, encoding them into a deterministic framework may invariably result in pathological instantiations of those values, where an AGI optimizing for "happiness" might simply incapacitate humans and stimulate their reward centers directly. Furthermore, the socio-economic implications of AGI threaten to exacerbate existing inequalities, as the means of intellectual production become monopolized by the entities that develop these systems. Consequently, the mitigation of these risks requires an unprecedented level of global cooperation, prioritizing safety research over capability scaling, a paradigm shift that runs counter to the competitive imperatives of the current tech ecosystem.`,
    difficulty: 'Medium',
    topicCategory: 'Science & Technology',
    wordCount: 220,
    estimatedTimeMinutes: 8,
    questions: [
      {
        id: 'q1',
        questionNumber: 1,
        questionText: 'The primary purpose of the passage is to...',
        questionType: 'central_idea',
        options: {
          A: 'advocate for a complete halt on artificial intelligence research due to impending dangers.',
          B: 'outline the challenges of value alignment and socio-economic risks associated with AGI development.',
          C: 'compare the cognitive plasticity of narrow AI with that of anticipated AGI systems.',
          D: 'prove that human values are too culturally contingent to ever be encoded into machine logic.'
        },
        correctAnswer: 'B',
        explanation: {
          whyCorrect: 'Option B correctly synthesizes the passage\'s main focus: the alignment problem and the socio-economic risks of AGI.',
          whyWrong: {
            A: 'Extreme option. The author mentions prioritizing safety, not a complete halt.',
            C: 'This is a specific detail from the first paragraph, not the primary purpose.',
            D: 'This is an argument made by "some ethicists" in the passage, not the overall purpose.'
          },
          commonTrap: 'Option D is tempting because it is stated in the passage, but it is a subset of the main argument rather than the central idea.',
          strategyTip: 'For central idea questions, choose the option that acts as an umbrella for the entire passage, not just one paragraph.'
        }
      },
      {
        id: 'q2',
        questionNumber: 2,
        questionText: 'Which of the following can be inferred regarding the "alignment problem"?',
        questionType: 'inference',
        options: {
          A: 'It can only be solved once human values become globally standardized and culturally uniform.',
          B: 'It arises because AGI systems might interpret human directives in ways that are technically accurate but practically harmful.',
          C: 'It is a modern philosophical concern that has entirely replaced earlier fears of machine malevolence.',
          D: 'It is driven by the competitive imperatives of the tech ecosystem prioritizing capability over safety.'
        },
        correctAnswer: 'B',
        explanation: {
          whyCorrect: 'The passage mentions that an AGI optimizing for "happiness" might simply incapacitate humans. This implies that the alignment problem involves AGI following directives (optimizing happiness) in a technically accurate but harmful way.',
          whyWrong: {
            A: 'The passage states human values are culturally contingent but doesn\'t say standardizing them is the *only* solution.',
            C: 'The passage says the dilemma lies *not necessarily* in the trope of malevolence, not that it has *entirely* replaced it.',
            D: 'The tech ecosystem prioritizing capability is what makes mitigation difficult, not the cause of the alignment problem itself.'
          },
          commonTrap: 'Options A and C use extreme language ("only", "entirely") which is rarely correct in inference questions.',
          strategyTip: 'Look for the option that must be true based on the premises in the text without taking a leap of faith.'
        }
      },
      {
        id: 'q3',
        questionNumber: 3,
        questionText: 'The author mentions the scenario of an AGI incapacitating humans to stimulate their reward centers in order to...',
        questionType: 'detail',
        options: {
          A: 'illustrate how a generalized goal can lead to a pathological outcome if not aligned with nuanced human values.',
          B: 'predict the most likely dystopian future if capability scaling continues unabated.',
          C: 'demonstrate that human values are culturally contingent and contradictory.',
          D: 'prove that artificial general intelligence will inevitably develop malevolent intentions toward humanity.'
        },
        correctAnswer: 'A',
        explanation: {
          whyCorrect: 'This specific example is used immediately after discussing the difficulty of encoding nebulous human values, showing how a simplistic translation of a value (happiness) can go wrong.',
          whyWrong: {
            A: '',
            B: 'It is a hypothetical illustration, not a prediction of the "most likely" future.',
            C: 'It illustrates the consequence of the problem, not the problem itself.',
            D: 'The passage explicitly contrasts this with "machine malevolence," showing it\'s about misalignment, not malice.'
          },
          commonTrap: 'Confusing an illustrative example with a predictive claim (Option B).',
          strategyTip: 'When asked why an author mentions a specific detail, look at the sentence immediately preceding it for the argument it supports.'
        }
      },
      {
        id: 'q4',
        questionNumber: 4,
        questionText: 'The author’s attitude towards the current tech ecosystem can best be described as...',
        questionType: 'tone',
        options: {
          A: 'cautiously optimistic regarding its ability to self-regulate.',
          B: 'vehemently antagonistic and calling for its dismantling.',
          C: 'critical of its prioritization of capability scaling over safety.',
          D: 'indifferent, viewing its trajectory as an inevitable consequence of free markets.'
        },
        correctAnswer: 'C',
        explanation: {
          whyCorrect: 'The final sentence states that mitigating risks requires a paradigm shift prioritizing safety, which "runs counter to the competitive imperatives of the current tech ecosystem," indicating a critical stance on its current priorities.',
          whyWrong: {
            A: 'The passage implies the ecosystem is currently opposed to the necessary safety paradigm.',
            B: 'The author is critical, but "vehemently antagonistic" and "dismantling" is too extreme.',
            D: 'The author advocates for "global cooperation", showing they are not indifferent.'
          },
          commonTrap: 'Choosing a tone word that is either too extreme (B) or too positive (A) compared to the text.',
          strategyTip: 'Identify whether the tone is positive, negative, or neutral first. Here it is negative. Then evaluate the intensity. "Critical" matches the measured tone better than "antagonistic".'
        }
      }
    ]
  },
  {
    id: 'rc-2',
    date: new Date().toISOString().split('T')[0],
    title: 'Behavioral Economics and Urban Migration',
    passage: `The persistence of rural-to-urban migration in developing economies, even in the face of saturated urban labor markets and squalid living conditions, has long puzzled neoclassical economists. Traditional models, such as the Harris-Todaro framework, posit that individuals migrate based on expected income differentials, balancing the probability of formal employment against the certainty of current rural wages. However, behavioral economics introduces a critical nuance by acknowledging the role of bounded rationality and heuristic decision-making. Migrants do not compute exhaustive probabilities; rather, they rely on 'availability heuristics,' disproportionately weighting the success stories of a few affluent returnees while discounting the pervasive underemployment among the urban poor. Furthermore, the 'relative deprivation' hypothesis suggests that migration is often driven not by absolute poverty, but by a perceived gap in status relative to one's reference group in the village. This shifts the catalyst from a simple income-maximizing calculation to a complex social positioning strategy. Compounding this is the 'sunk cost fallacy,' wherein migrants, having invested significant financial and psychological resources to relocate, are reluctant to return home despite facing objectively worse conditions, choosing instead to languish in informal sectors. Thus, analyzing urbanization solely through the lens of rational utility maximization yields incomplete policy prescriptions that fail to address the psychological drivers of human movement.`,
    difficulty: 'Hard',
    topicCategory: 'Economics & Business',
    wordCount: 220,
    estimatedTimeMinutes: 10,
    questions: [
      {
        id: 'q1',
        questionNumber: 1,
        questionText: 'The primary purpose of the passage is to...',
        questionType: 'central_idea',
        options: {
          A: 'refute the Harris-Todaro framework by proving that rural migrants are inherently irrational.',
          B: 'argue that neoclassical economic models are completely irrelevant to modern urbanization.',
          C: 'explain how behavioral economics provides a more comprehensive understanding of rural-to-urban migration.',
          D: 'advocate for policy changes that restrict rural-to-urban migration in developing economies.'
        },
        correctAnswer: 'C',
        explanation: {
          whyCorrect: 'The passage focuses on introducing behavioral economics concepts (heuristics, relative deprivation, sunk cost) to explain migration phenomena that neoclassical models fail to fully capture.',
          whyWrong: {
            A: 'The passage says they have "bounded rationality", not that they are "inherently irrational".',
            B: '"Completely irrelevant" is too extreme. It says they yield "incomplete" prescriptions.',
            D: 'The passage mentions policy prescriptions but doesn\'t advocate for restricting migration.'
          },
          commonTrap: 'Option A uses extreme language ("inherently irrational") which misrepresents the nuanced concept of bounded rationality.',
          strategyTip: 'Avoid answers that use extreme qualifiers unless the passage strongly supports them.'
        }
      },
      {
        id: 'q2',
        questionNumber: 2,
        questionText: 'Which of the following can be inferred about the "availability heuristic" in the context of the passage?',
        questionType: 'inference',
        options: {
          A: 'It leads potential migrants to accurately estimate their chances of urban success based on available data.',
          B: 'It causes individuals to base decisions on highly visible examples rather than statistical averages.',
          C: 'It is a strategy used by urban employers to make job opportunities seem more available than they are.',
          D: 'It primarily affects migrants who are motivated by absolute poverty rather than relative deprivation.'
        },
        correctAnswer: 'B',
        explanation: {
          whyCorrect: 'The passage states migrants rely on availability heuristics by "disproportionately weighting the success stories of a few affluent returnees while discounting the pervasive underemployment". This means they use highly visible examples (success stories) instead of true statistics.',
          whyWrong: {
            A: 'It leads them to inaccurately estimate, not accurately estimate.',
            C: 'It is a cognitive bias of the migrants, not a strategy of employers.',
            D: 'The passage does not link availability heuristic exclusively to absolute poverty.'
          },
          commonTrap: 'Misunderstanding who is applying the heuristic (Option C).',
          strategyTip: 'Define the term based only on the context clues provided in the passage.'
        }
      },
      {
        id: 'q3',
        questionNumber: 3,
        questionText: 'According to the passage, the "relative deprivation" hypothesis suggests that:',
        questionType: 'detail',
        options: {
          A: 'migrants are driven by the absolute destitution of their rural conditions.',
          B: 'urban poor feel relatively deprived compared to affluent urbanites.',
          C: 'the desire to improve social status within one’s rural community motivates migration.',
          D: 'rural communities deliberately deprive potential migrants of resources to force them to leave.'
        },
        correctAnswer: 'C',
        explanation: {
          whyCorrect: 'The passage says migration is driven by a "perceived gap in status relative to one\'s reference group in the village" and is a "complex social positioning strategy".',
          whyWrong: {
            A: 'The passage explicitly says it is driven "not by absolute poverty".',
            B: 'The reference group is "in the village", not "affluent urbanites".',
            D: 'There is no mention of communities deliberately depriving people.'
          },
          commonTrap: 'Option B is a plausible real-world scenario but contradicts the specific text which points to the village as the reference group.',
          strategyTip: 'Always verify details directly against the text, ignoring outside knowledge.'
        }
      },
      {
        id: 'q4',
        questionNumber: 4,
        questionText: 'The passage implies that policy prescriptions based solely on the Harris-Todaro framework might fail because they:',
        questionType: 'inference',
        options: {
          A: 'focus exclusively on psychological drivers rather than economic ones.',
          B: 'assume that migrants have access to and process complete information regarding probabilities.',
          C: 'encourage the sunk cost fallacy by subsidizing urban migration.',
          D: 'ignore the absolute poverty that is the primary driver of all migration.'
        },
        correctAnswer: 'B',
        explanation: {
          whyCorrect: 'The passage contrasts the Harris-Todaro framework (which posits migrants balance probabilities of employment) with behavioral economics (which notes bounded rationality and that migrants do not compute exhaustive probabilities). Thus, traditional models assume access to/processing of complete info.',
          whyWrong: {
            A: 'They focus on economic drivers, ignoring psychological ones.',
            C: 'There is no mention of the framework subsidizing migration.',
            D: 'The passage says migration is often NOT driven by absolute poverty.'
          },
          commonTrap: 'Confusing the characteristics of the traditional model with those of the behavioral model (Option A).',
          strategyTip: 'Trace the contrast between the two models carefully. If Model A lacks what Model B has, then Model A fails because it misses Model B\'s insights.'
        }
      }
    ]
  }
];
