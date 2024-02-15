import { CWCommandOptions } from '@/command-runner';
import { DiffOptionsGenerator } from './diff-options.generator';

describe('DiffOptionsGenerator', () => {
  describe('branch', () => {
    it('should generate branch diff options correctly', () => {
      const options: CWCommandOptions = { branch: true };
      const inputs = ['branch1', 'branch2'];
      const result = DiffOptionsGenerator.generate(options, inputs);
      expect(result).toEqual({
        type: 'branch',
        branch1: 'branch1',
        branch2: 'branch2',
      });
    });

    it('should throw an error for insufficient branch inputs', () => {
      const options: CWCommandOptions = { branch: true };
      const inputs = ['branch1'];
      expect(() => DiffOptionsGenerator.generate(options, inputs)).toThrow(
        'Branch comparison requires exactly two branch names.',
      );
    });
  });

  describe('commit', () => {
    it('should generate commit diff options correctly', () => {
      const options: CWCommandOptions = { commit: true };
      const inputs = ['commit1', 'commit2'];
      const result = DiffOptionsGenerator.generate(options, inputs);
      expect(result).toEqual({
        type: 'commit',
        commit1: 'commit1',
        commit2: 'commit2',
      });
    });

    it('should throw an error for insufficient commit inputs', () => {
      const options: CWCommandOptions = { commit: true };
      const inputs = ['commit1']; // Only one commit provided
      expect(() => DiffOptionsGenerator.generate(options, inputs)).toThrow(
        'Commit comparison requires exactly two commit identifiers.',
      );
    });
  });

  describe('file', () => {
    it('should generate file diff options correctly', () => {
      const options: CWCommandOptions = { file: true };
      const inputs = ['file1.txt', 'file2.txt'];
      const result = DiffOptionsGenerator.generate(options, inputs);
      expect(result).toEqual({
        type: 'file',
        files: ['file1.txt', 'file2.txt'],
      });
    });

    it('should throw an error for no file inputs in file comparison', () => {
      const options: CWCommandOptions = { file: true };
      const inputs = []; // No files provided
      expect(() => DiffOptionsGenerator.generate(options, inputs)).toThrow(
        'File comparison requires at least one file path.',
      );
    });
  });

  describe('stage', () => {
    it('should generate stage diff options for generate option', () => {
      const options: CWCommandOptions = { generate: true };
      const inputs = []; // No inputs needed for stage
      const result = DiffOptionsGenerator.generate(options, inputs);
      expect(result).toEqual({ type: 'stage' });
    });
  });

  it('should throw an error for invalid options', () => {
    const options: CWCommandOptions = {}; // No valid options provided
    const inputs = ['anyInput'];
    expect(() => DiffOptionsGenerator.generate(options, inputs)).toThrow(
      'Invalid command options. Please specify a valid comparison type.',
    );
  });
});
