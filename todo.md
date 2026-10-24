# Thesis to-do list by category

## 1. Problematic and scope

- [ ] Write the problematic statement (1 paragraph)
- [ ] Define objectives and scope limits
- [ ] Choose the sign language (ASL dataset as proof of concept, or custom collection)
- [ ] List what is out of scope (continuous signing, full text-to-sign generation)

## 2. Risk analysis

- [ ] Build the risk register table (ID, risk, category, probability, impact, mitigation)
- [ ] Cover categories: technical, privacy/legal, social/ethical, safety, project
- [ ] Add the "risk to risk" matrix (mitigation and the new risk it creates)
- [ ] Add one flow diagram of the transitions
- [ ] Check Algerian law 18-07 for biometric/personal data obligations

## 3. AI model

- [ ] Download a small WLASL subset (20-50 glosses)
- [ ] Extract MediaPipe landmarks (hands, pose, face)
- [ ] Train BiLSTM baseline
- [ ] Train Transformer encoder on the same split
- [ ] Run an existing ST-GCN implementation
- [ ] Compare accuracy, top-5, latency, model size
- [ ] Write a short state-of-the-art paragraph on brain-inspired networks
- [ ] Define text-to-sign approach (dictionary of clips)

## 4. UML: use cases

- [ ] List actors: Visitor, User (Deaf/Hearing), Supervisor/Psychologist, Admin, AI Translation Service
- [ ] Draw the use-case diagram with include, extend, generalization
- [ ] Add admin actions: manage users, private and public rooms, audit logs, supervisors, AI model config, ban/restore
- [ ] Add supervisor actions: moderate room, mute/remove user, handle reports, escalate crisis
- [ ] Study one or two existing chat systems (Discord, Slack) and adapt
- [ ] Write scenarios for main use cases (preconditions, main flow, alternatives, exceptions, postconditions)

## 5. UML: class diagram

- [ ] Define User hierarchy, ChatRoom hierarchy, Message hierarchy
- [ ] Add Translation, Report, ModerationAction, AuditLog, Membership, Notification
- [ ] Define TranslationService interface and implementations
- [ ] Set multiplicities and verify against use cases

## 6. UI library and stack

- [ ] Confirm mobile: React Native + Expo
- [ ] Confirm web: React + Vite
- [ ] Pick UI libraries (React Native Paper, shadcn/ui + Tailwind)
- [ ] Pick chat UI (react-native-gifted-chat) and realtime (Socket.IO)
- [ ] Pick AI serving (FastAPI, ONNX/TFLite)
- [ ] Define shared design tokens for web and mobile

## 7. PDF assembly

- [ ] Create the document skeleton (chapters in order)
- [ ] Insert diagrams and tables as they are completed
- [ ] Add references list

## Resources

- MediaPipe Holistic: https://ai.google.dev/edge/mediapipe/solutions/vision/holistic_landmarker
- WLASL: https://dxli94.github.io/WLASL/
- ST-GCN: https://arxiv.org/abs/1801.07455
- Sign Language Transformers: https://arxiv.org/abs/2003.13830
- ISO 31000: https://www.iso.org/iso-31000-risk-management.html
- UML use cases: https://www.uml-diagrams.org/use-case-diagrams.html
- Discord moderation: https://support.discord.com/hc/en-us/articles/4410339366295
- React Native Paper: https://callstack.github.io/react-native-paper/
- shadcn/ui: https://ui.shadcn.com
- draw.io: https://www.drawio.com

Which category should I start on: the risk register or the use-case diagram?
